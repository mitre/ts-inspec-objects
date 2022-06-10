import Control from "./control";
import YAML from "yaml";
import _ from "lodash";
import { unformatText } from "../utilities/global";

export default class Profile {
  name?: string | null;
  title?: string | null;
  maintainer?: string | null;
  copyright?: string | null;
  copyright_email?: string | null;
  license?: string | null;
  summary?: string | null;
  description?: string | null;
  version?: string | null;
  inspec_version?: string | null;
  supports: {
    "platform-family"?: string;
    "platform-name"?: string;
    "os-name"?: string;
    "os-family"?: string;
    release?: string;
    platform?: string;
  }[] = [];
  depends: {
    // Required for all
    name: string; // Required for all

    // Local file
    path?: string; // Local path on disk

    // Remote HTTP(s)
    url?: string; // Remote URL tarball
    username?: string; // HTTP Basic Authentication Username
    password?: string; // HTTP Basic Authentication Password

    // Git Repository
    git?: string;
    branch?: string;
    tag?: string;
    commit?: string;
    version?: string;
    relative_path?: string;

    // Chef Supermarket
    supermarket?: string;

    // Base Compliance
    compliance?: string;
  }[] = [];
  inputs: { [key: string]: string }[] = [];
  gem_dependencies?: {name: string, version: string}[];
  libraries: string[] = [];
  readme?: string | null;
  files: string[] = [];
  controls: Control[] = [];

  constructor(data?: Omit<Partial<Profile>, "controls">) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        _.set(this, key, value);
      });
    }
  }

  createInspecYaml(): string {
    return YAML.stringify({
      name: this.name,
      title: this.title,
      maintainer: this.maintainer,
      copyright: this.copyright,
      copyright_email: this.copyright_email,
      license: this.license,
      summary: this.summary,
      description: this.description,
      version: this.version,
      supports: this.supports,
      depends: this.depends,
      inspec_version: this.inspec_version,
    });
  }

  toUnformattedObject(): Profile {
    const unformattedProfile: Profile = new Profile(this);
    Object.entries(this).forEach(([key, value]) => {
      if (typeof value === "string") {
        _.set(unformattedProfile, key, unformatText(value));
      }
    });
    unformattedProfile.controls = this.controls.map((control) => control.toUnformattedObject())
    return unformattedProfile;
  }
}
