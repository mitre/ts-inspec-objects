import mustache from 'mustache';
import {ProfileDiff} from '../types/diff';
import _ from 'lodash';
import template from '../resources/automatticUpdateTemplate.json';

type DiffValues = {id: string, old: string, new: string}[]

/**
 * Generates a markdown representation of the differences between two profiles.
 *
 * The function processes the differences to create a renderable data structure
 * that includes added controls, renamed controls, and updated properties such as
 * checks, fixes, impacts, titles, and descriptions. It then uses a mustache template
 * to render the markdown output.
 * 
 * @param diff - An object containing the differences between two profiles.
 * @param diff.ignoreFormattingDiff - The profile differences ignoring formatting changes.
 * @param diff.rawDiff - The raw differences between the profiles.
 * @returns A string containing the markdown representation of the differences.
 */
export function createDiffMarkdown(
  diff: {
    ignoreFormattingDiff: ProfileDiff;
    rawDiff: any;
  }
): string {
  const renderableDiffData = {
    addedControls: Object.values(diff.ignoreFormattingDiff.addedControls),
    hasRenamedControls: false,
    renamedControls: [] as { oldId: string; newId: string }[],
    updatedChecks: [] as DiffValues,
    updatedFixes: [] as DiffValues,
    updatedImpacts: [] as DiffValues,
    updatedTitles: [] as DiffValues,
    updatedDescriptions: [] as DiffValues,
  };

  Object.entries(diff.ignoreFormattingDiff.renamedControlIDs).forEach(
    ([oldId, newId]) => {
      renderableDiffData.hasRenamedControls = true;
      renderableDiffData.renamedControls.push({
        oldId: oldId,
        newId: newId,
      });
    }
  );

  Object.entries((diff.rawDiff as ProfileDiff).changedControls).forEach(
    ([id, controlDiff]) => {
      if (controlDiff.descs?.check) {
        const oldCheck = _.get(controlDiff.descs.check, '__old', 'undefined') as string;
        const newCheck = _.get(controlDiff.descs.check, '__new', 'undefined') as string;
        if (
          oldCheck.replace(/\n/g, '').replace(/\W/g, '') !==
          newCheck.replace(/\n/g, '').replace(/\W/g, '')
        ) {
          renderableDiffData.updatedChecks.push({
            id: id,
            old: oldCheck,
            new: newCheck,
          });
        }
      }
      if (controlDiff.descs?.fix) {
        const oldFix = _.get(controlDiff.descs.fix, '__old', 'undefined') as string;
        const newFix = _.get(controlDiff.descs.fix, '__new', 'undefined') as string;
        if (
          oldFix.replace(/\n/g, '').replace(/\W/g, '') !==
          newFix.replace(/\n/g, '').replace(/\W/g, '')
        ) {
          renderableDiffData.updatedFixes.push({
            id: id,
            old: oldFix,
            new: newFix,
          });
        }
      }
      if (controlDiff.impact) {
        const oldImpact = _.get(controlDiff.impact, '__old', 'undefined') as string;
        const newImpact = _.get(controlDiff.impact, '__new', 'undefined') as string;
        if (oldImpact !== newImpact) {
          renderableDiffData.updatedImpacts.push({
            id: id,
            old: oldImpact,
            new: newImpact,
          });
        }
      }
      if (controlDiff.title) {
        const oldTitle = _.get(controlDiff.title, '__old', 'undefined') as string;
        const newTitle = _.get(controlDiff.title, '__new', 'undefined') as string;
        if (oldTitle !== newTitle) {
          renderableDiffData.updatedTitles.push({
            id: id,
            old: oldTitle,
            new: newTitle,
          });
        }
      }

      if (controlDiff.desc) {
        const oldDesc = _.get(controlDiff.desc, '__old', 'undefined') as string;
        const newDesc = _.get(controlDiff.desc, '__new', 'undefined') as string;
        if (oldDesc !== newDesc) {
          renderableDiffData.updatedDescriptions.push({
            id: id,
            old: oldDesc,
            new: newDesc,
          });
        }
      }
    }
  );

  // Render output
  return mustache.render(template.data, renderableDiffData);
}
