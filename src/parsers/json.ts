import {
  ContextualizedEvaluation,
  ContextualizedProfile,
  contextualizeEvaluation,
  contextualizeProfile,
  ConversionResult,
  convertFile,
  ExecJSON
} from 'inspecjs';
import _ from 'lodash';
import Control, {objectifyDescriptions} from '../objects/control';
import Profile from '../objects/profile';
import {getExistingDescribeFromControl} from '../utilities/update';

/**
 * Processes a contextualized evaluation input and converts it into a Profile object.
 *
 * @param evaluationInput - The contextualized evaluation input containing profile and control data.
 * @returns A Profile object populated with the data from the evaluation input.
 */
export function processEvaluation(evaluationInput: ContextualizedEvaluation) {
  const topLevelProfile = evaluationInput.contains[0];
  const profile = new Profile({
    name: topLevelProfile.data.name,
    title: topLevelProfile.data.title,
    maintainer: topLevelProfile.data.maintainer,
    copyright: topLevelProfile.data.copyright,
    copyright_email: topLevelProfile.data.copyright_email,
    license: _.get(topLevelProfile.data, 'license'),
    summary: _.get(topLevelProfile.data, 'summary'),
    description: _.get(topLevelProfile.data, 'description'),
    version: topLevelProfile.data.version,
  });
  topLevelProfile.contains.forEach((control) => {
    profile.controls.push(
      new Control({
        id: control.data.id,
        title: control.data.title,
        impact: control.data.impact,
        desc: control.data.desc,
        descs: objectifyDescriptions(control.hdf.wraps.descriptions),
        tags: control.hdf.wraps.tags,
      })
    );
  });
  return profile;
}

/**
 * Processes a contextualized profile JSON object and converts it into a Profile instance.
 *
 * @param profileInput - The contextualized profile input containing profile data and controls.
 * @returns A Profile instance populated with the data from the input.
 */
export function processProfileJSON(
  profileInput: ContextualizedProfile
): Profile {
  const profile = new Profile({
    name: profileInput.data.name,
    title: profileInput.data.title,
    maintainer: profileInput.data.maintainer,
    copyright: profileInput.data.copyright,
    copyright_email: profileInput.data.copyright_email,
    license: _.get(profileInput.data, 'license'),
    summary: _.get(profileInput.data, 'summary'),
    description: _.get(profileInput.data, 'description'),
    version: profileInput.data.version,
  });
  profileInput.data.controls.forEach((control) => {
    const newControl = new Control({
      id: control.id,
      title: control.title,
      desc: control.desc,
      impact: control.impact,
      code: control.code,
      tags: control.tags,
      descs: objectifyDescriptions(control.descriptions),
    })
    newControl.describe = getExistingDescribeFromControl(newControl);

    // Migrate check and fix text from tags to descriptions
    if (newControl.tags.check && !newControl.descs.check) {
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      _.set(newControl.descs, 'check', control.tags.check);
      _.set(newControl.tags, 'check', undefined);
    }

    if (newControl.tags.fix && !newControl.descs.fix) {
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      _.set(newControl.descs!, 'fix', control.tags.fix);
      _.set(newControl.tags, 'fix', undefined);
    }

    profile.controls.push(newControl);
  });
  return profile;
}

/**
 * Processes the given ExecJSON execution object and returns a Profile.
 *
 * This function takes an ExecJSON execution object, contextualizes the evaluation,
 * and then processes the evaluation to produce a Profile.
 *
 * @param execJSON - The ExecJSON execution object to be processed.
 * @returns The processed Profile.
 */
export function processExecJSON(execJSON: ExecJSON.Execution): Profile {
  return processEvaluation(contextualizeEvaluation(execJSON));
}

/**
 * Processes an InSpec profile from a JSON string.
 *
 * This function takes a JSON string representing an InSpec profile, converts it,
 * and processes it to return a `Profile` object. It handles different versions
 * of the InSpec JSON format and sorts the controls by their ID.
 *
 * @param json - The JSON string representing the InSpec profile.
 * @returns A `Profile` object containing the processed profile data.
 * @throws Will throw an error if the JSON string does not match known InSpec formats.
 */
export function processInSpecProfile(json: string): Profile {
  const convertedFile: ConversionResult = convertFile(json, true);
  let profile = new Profile();
  if (convertedFile['1_0_ExecJson']) {
    profile = processEvaluation(
      contextualizeEvaluation(convertedFile['1_0_ExecJson'])
    ).toUnformattedObject();
  } else if (convertedFile['1_0_ProfileJson']) {
    profile = processProfileJSON(contextualizeProfile(JSON.parse(json))).toUnformattedObject();
  } else {
    throw new Error('Unknown file type passed');
  }

  profile.controls = _.sortBy(profile.controls, 'id');
   
  return profile;
}

