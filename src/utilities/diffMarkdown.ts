import mustache from "mustache";
import { ProfileDiff } from "../types/diff";
import Profile from '../objects/profile'
import _ from "lodash";
import template from '../resources/automatticUpdateTemplate.json'

function getUpdatedCheckForId(id: string, profile: Profile) {
  const foundControl = profile.controls.find((control) => control.id === id);
  return _.get(foundControl?.descs, 'check') || 'Missing check';
}

export function createDiffMarkdown(diff: {
  simplified: ProfileDiff;
  originalDiff: any;
}, updatedProfile: Profile): string {
  const renderableDiffData = {
    addedControls: Object.values(diff.simplified.addedControls),
    hasRenamedControls: false,
    renamedControls: [] as {oldId: string, newId: string}[],
    checks: [] as unknown[],
    fixes: [] as unknown[],
  };

  Object.entries(diff.simplified.renamedControlIds).forEach(([oldId, newId]) => {
    renderableDiffData.hasRenamedControls = true
    renderableDiffData.renamedControls.push({
      oldId: oldId,
      newId: newId,
    });
  })

  // Object.entries((diff.originalDiff as ProfileDiff).changedControls).forEach(([id, controlDiff]) => {
  //   if (controlDiff.descs?.check) {
  //     console.log(controlDiff.descs.check)
  //   }
  // })

  // Render output
  return mustache.render(template.data, renderableDiffData);
}
