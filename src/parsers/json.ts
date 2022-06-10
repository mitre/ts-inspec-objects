import {
  ContextualizedEvaluation,
  ContextualizedProfile,
  contextualizeEvaluation,
  contextualizeProfile,
  ConversionResult,
  convertFile,
  ExecJSON,
  ProfileJSON,
} from "inspecjs";
import _ from "lodash";
import Control from "../objects/control";
import Profile from "../objects/Profile";

export function processEvaluation(evaluationInput: ContextualizedEvaluation) {
  const topLevelProfile = evaluationInput.contains[0];
  const profile = new Profile({
    name: topLevelProfile.data.name,
    title: topLevelProfile.data.title,
    maintainer: topLevelProfile.data.maintainer,
    copyright: topLevelProfile.data.copyright,
    copyright_email: topLevelProfile.data.copyright_email,
    license: _.get(topLevelProfile.data, "license"),
    summary: _.get(topLevelProfile.data, "summary"),
    description: _.get(topLevelProfile.data, "description"),
    version: topLevelProfile.data.version,
  });
  topLevelProfile.contains.forEach((control) => {
    profile.controls.push(
      new Control({
        id: control.data.id,
        title: control.data.title,
        impact: control.data.impact,
        desc: control.data.desc,
        descs: control.hdf.wraps.descriptions,
        tags: control.hdf.wraps.tags,
      })
    );
  });
  return profile;
}

export function processProfileJSON(
  profileInput: ContextualizedProfile
): Profile {
  const profile = new Profile({
    name: profileInput.data.name,
    title: profileInput.data.title,
    maintainer: profileInput.data.maintainer,
    copyright: profileInput.data.copyright,
    copyright_email: profileInput.data.copyright_email,
    license: _.get(profileInput.data, "license"),
    summary: _.get(profileInput.data, "summary"),
    description: _.get(profileInput.data, "description"),
    version: profileInput.data.version,
  });
  profileInput.data.controls.forEach((control) => {
    profile.controls.push(
      new Control({
        id: control.id,
        title: control.title,
        desc: control.desc,
        impact: control.impact,
        code: control.code,
        tags: control.tags,
        descs: control.descriptions,
      })
    );
  });
  return profile;
}

export function processExecJSON(execJSON: ExecJSON.Execution) {
  return processEvaluation(contextualizeEvaluation(execJSON));
}

export function processJSON(json: string): Profile {
  const convertedFile: ConversionResult = convertFile(json, true);
  let profile = new Profile();
  if (convertedFile["1_0_ExecJson"]) {
    profile = processEvaluation(
      contextualizeEvaluation(convertedFile["1_0_ExecJson"])
    ).toUnformattedObject();
  } else if (convertedFile["1_0_ProfileJson"]) {
    profile = processProfileJSON(contextualizeProfile(JSON.parse(json))).toUnformattedObject();
  } else {
    throw new Error("Unknown file type passed");
  }

  profile.controls = _.sortBy(profile.controls, "id");

  return profile;
}
