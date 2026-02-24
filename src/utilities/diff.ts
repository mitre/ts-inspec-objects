import {diff} from 'json-diff';
import Profile from '../objects/profile';
import {ProfileDiff} from '../types/diff';
import _ from 'lodash';
import {findUpdatedControlByAllIdentifiers} from './update';
import winston from 'winston';
import {removeWhitespace} from './global';

/**
 * Removes newlines from all string values within a nested object.
 * 
 * This function recursively traverses the provided object and replaces
 * newline characters (`\n`) in string values with the placeholder `{{{{newlineHERE}}}}`.
 * It also trims any leading or trailing whitespace from the string values.
 * 
 * @param control - The object from which to remove newlines. If not provided,
 *                  an empty object is returned.
 * @returns A new object with newlines removed from all string values.
 */
export function removeNewlines(
  control?: Record<string, unknown>
): Record<string, unknown> {
  if (!control) {
    return {};
  }
  return _.mapValues(control, (value) => {
    if (typeof value === 'string') {
      return value.replace(/\n/g, '{{{{newlineHERE}}}}').trim();
    } else if (typeof value === 'object' && value !== null) {
      return removeNewlines(value as Record<string, unknown>);
    }
    return value;
  });
}

/**
 * Processes a diff object to ignore formatting differences such as whitespace.
 * Goal is to use a linter for the formatting and compare characters without
 * whitespaces here.
 * 
 * The function performs the following:
 * - If the diff value has a `__new` property, it compares the `__new` and
 *   `__old` values after removing whitespace. If they are different, it sets
 *   the result to the `__new` value.
 * - If the diff value is an array, it maps and filters the array to include
 *   only the new values.
 * - If the diff value is an object, it recursively processes the object.
 * - If the key ends with `__deleted`, it ignores the value.
 * - Otherwise, it sets the result to the diff value.
 * 
 * @param diffData - The diff object containing differences to process.
 * @returns A new object with formatting differences ignored.
 * 

 */
export function ignoreFormattingDiff(diffData: Record<string, unknown>) {
  return _.transform(
    diffData,
    (result: Record<string, unknown>, diffValue, key) => {
      if (_.has(diffValue, '__new')) {
        // Remove any trailing space
        if (
          typeof _.get(diffValue, '__new') === 'string' &&
          typeof _.get(diffValue, '__old') === 'string'
        ) {
          if (
            removeWhitespace(_.get(diffValue, '__new', 'undefined')) !==
            removeWhitespace(_.get(diffValue, '__old', 'undefined'))
          ) {
            _.set(result, key, _.get(diffValue, '__new'));
          }
        } else {
          result[key] = _.get(diffValue, '__new');
        }
      } else if (Array.isArray(diffValue)) {
        result[key] = diffValue
          .map((value) => value[0] === '+' && value[1])
          .filter((value) => value);
      } else if (typeof diffValue === 'object') {
        result[key] = ignoreFormattingDiff(diffValue as Record<string, unknown>);
      } else if (key.endsWith('__deleted')) {
        return undefined;
      } else {
        result[key] = diffValue;
      }
    }
  );
}

/**
 * Computes the differences between two profiles and logs the process.
 *
 * @param fromProfile - The original profile to compare from.
 * @param toProfile   - The target profile to compare to.
 * @param logger      - The logger instance to use for logging information.
 * 
 * @returns An object containing two properties:
 *  - `ignoreFormattingDiff`: The profile differences ignoring formatting changes.
 *  - `rawDiff`: The raw profile differences.
 */
export function diffProfile(
  fromProfile: Profile,
  toProfile: Profile,
  logger: winston.Logger
): { ignoreFormattingDiff: ProfileDiff; rawDiff: Record<string, unknown> } {
  logger.info(`Processing diff between: ${fromProfile.name}(v:${fromProfile.version}) and: ${toProfile.name}(v:${toProfile.version})`)

  const profileDiff: ProfileDiff = {
    addedControlIDs: [],
    removedControlIDs: [],
    renamedControlIDs: {},
    changedControlIDs: [],
    addedControls: {},
    changedControls: {},
  };

  const originalDiff: ProfileDiff = {
    addedControlIDs: [],
    removedControlIDs: [],
    renamedControlIDs: {},
    changedControlIDs: [],
    addedControls: {},
    changedControls: {},
  };

  const fromControlIDs = fromProfile.controls.map((control) => control.id).sort();
  const toControlIDs = toProfile.controls.map((control) => control.id).sort();

  // Find new controls
  const controlIDDiff: string[][] | undefined = diff(
    fromControlIDs,
    toControlIDs
  )?.filter((item: string) => !(item.length === 1 && item[0] === ' '));

  // Contains the new IDs
  const changedControlIds: string[] = [];

  // a diffValue has an entry for both what was subtracted ("-")
  // and what was added ("+") -- need to handle both
  controlIDDiff?.forEach((diffValue) => {
    if (diffValue[0] === '-') {
      const existingControl = fromProfile.controls.find(
        (control) => control.id === diffValue[1]
      );
      // Check if the control has been given a new ID
      if (existingControl) {
        const newControl = findUpdatedControlByAllIdentifiers(
          existingControl,
          toProfile.controls
        );
        if (newControl && newControl.id !== existingControl.id) {
          profileDiff.renamedControlIDs[existingControl.id] = newControl.id;
          originalDiff.renamedControlIDs[existingControl.id] = newControl.id;

          changedControlIds.push(newControl.id.toLowerCase());
          const controlDiff: Record<string, any> | undefined = _.omit(
            diff(existingControl, newControl),
            'code__deleted'
          );

          // logger.info("CONTROL DIFF:" + JSON.stringify(controlDiff, null, 2))

          const renamedControlIgnoredFormatting = ignoreFormattingDiff(controlDiff);
          profileDiff.changedControls[newControl.id] = renamedControlIgnoredFormatting;
          profileDiff.changedControlIDs.push(newControl.id);
          originalDiff.changedControls[newControl.id] = controlDiff;
          originalDiff.changedControlIDs.push(newControl.id);

          logger.verbose(
            `Control ${existingControl.id} has been updated to ${newControl.id}`
          );
          logger.debug(`Updated control content: ${JSON.stringify(renamedControlIgnoredFormatting)}`);
        } else {
          profileDiff.removedControlIDs.push(diffValue[1]);
          originalDiff.removedControlIDs.push(diffValue[1]);
        }
      } else {
        logger.error(`Unable to find existing control ${diffValue[1]}`);
      }
    } else if (diffValue[0] === '+' && !changedControlIds.includes(diffValue[1].toLowerCase()) && diffValue[1]) {
      logger.info(JSON.stringify(diffValue))
      logger.info(JSON.stringify(changedControlIds))
      profileDiff.addedControlIDs.push(diffValue[1]);
      originalDiff.addedControlIDs.push(diffValue[1]);
    }
  });

  // take the list of renamed controls out of the list of added controls
  // (a control is not "new" if it was renamed)
  profileDiff.addedControlIDs = profileDiff.addedControlIDs.filter((item: string) => !Object.values(profileDiff.renamedControlIDs).includes(item))
  originalDiff.addedControlIDs = originalDiff.addedControlIDs.filter((item: string) => !Object.values(originalDiff.renamedControlIDs).includes(item))

  // Add new controls to addedControls
  profileDiff.addedControlIDs.forEach((addedControl) => {
    const newControl = toProfile.controls.find(
      (control) => addedControl === control.id
    );
    if (newControl && !profileDiff.changedControls[newControl.id]) {
      profileDiff.addedControls[addedControl] = newControl;
      originalDiff.addedControls[addedControl] = newControl;
    }
  });

  // Find changed controls
  for (const fromControl of fromProfile.controls) {
    const toControl = toProfile.controls.find(
      (control) => control.id === fromControl.id
    );
    if (toControl) {
      const controlDiff: Record<string, any> | undefined = _.omit(
        diff(fromControl, toControl),
        'code__deleted'
      );
      if (controlDiff) {
         
        profileDiff.changedControls[toControl.id!] = ignoreFormattingDiff(controlDiff);
        profileDiff.changedControlIDs.push(toControl.id);
         
        originalDiff.changedControls[toControl.id!] = controlDiff;
        originalDiff.changedControlIDs.push(toControl.id);        
      }
    }
  }

  return {ignoreFormattingDiff: profileDiff, rawDiff: originalDiff};
}
