import mustache from "mustache";
import fs from "fs";
import { ProfileDiff } from "../types/diff";
import Profile from '../objects/profile'
import _ from "lodash";
import { removeNewlinePlaceholders } from "./global";
import { removeXMLSpecialCharacters } from "./xccdf";

function getUpdatedCheckForId(id: string, profile: Profile) {
  const foundControl = profile.controls.find((control) => control.id === id);
  console.log(foundControl)
  return _.get(foundControl?.descs, 'check') || 'Missing check';
}

export function createDiffMarkdown(diff: {
  simplified: ProfileDiff;
  originalDiff: any;
}, updatedProfile: Profile): string {
  const template = fs.readFileSync(
    "/home/c/Documents/SAF/ts-inspec-objects/src/resources/updatedcontrols.md",
    "utf8"
  );

  const renderableDiffData = {
    addedControls: Object.values(diff.simplified.addedControls),
    checks: [] as unknown[],
    fixes: [] as unknown[],
  };

  Object.entries(diff.simplified.changedControls).forEach(([id, updatedControl]) => {
    if (_.get(updatedControl, "descs.check")) {
      console.log(removeXMLSpecialCharacters(removeNewlinePlaceholders(getUpdatedCheckForId(id, updatedProfile))))
      renderableDiffData.checks.push({
        id,
        check: removeXMLSpecialCharacters(removeNewlinePlaceholders(getUpdatedCheckForId(id, updatedProfile))),
      });
    }
  })

  // Render output
  return mustache.render(template, renderableDiffData);
}