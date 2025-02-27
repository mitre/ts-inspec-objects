import Control from './control';
import YAML from 'yaml';
import _ from 'lodash';
import {unformatText} from '../utilities/global';

/**
 * Represents an InSpec profile with various metadata and dependencies.
 * 
 * @remarks
 * This class is used to model an InSpec profile, which includes metadata such as
 * name, title, maintainer, copyright, license, and version. It also includes
 * dependencies, supported platforms, inputs, gem dependencies, libraries, readme,
 * files, and controls.
 * 
 * It provides methods to generate a YAML representation of the profile and to convert
 * the profile to an unformatted version.
 * 
 * @example
 * ```typescript
 * const profileData = {
 *   name: "example-profile",
 *   title: "Example Profile",
 *   maintainer: "John Doe",
 *   version: "1.0.0",
 *   supports: [{ 'platform-name': 'ubuntu' }],
 *   depends: [{ name: "dependency-profile", url: "http://example.com/dependency.tar.gz" }],
 *   inputs: [{ key: "value" }],
 *   libraries: ["lib/example.rb"],
 *   files: ["controls/example.rb"],
 *   readme: "This is an example profile.",
 * };
 * 
 * const profile = new Profile(profileData);
 * const yamlString = profile.createInspecYaml();
 * console.log(yamlString);
 * ```
 * 
 * @public
 */
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
    'platform-family'?: string;
    'platform-name'?: string;
    'os-name'?: string;
    'os-family'?: string;
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

  /**
   * Constructs a new instance of the Profile class.
   * 
   * @param data - An optional object containing partial profile data, excluding the 'controls' property.
   *               The provided data will be used to set the corresponding properties on the instance.
   */
  constructor(data?: Omit<Partial<Profile>, 'controls'>) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        _.set(this, key, value);
      });
    }
  }

  /**
   * Generates an InSpec YAML string representation of the profile object.
   * Note: Per Chef documentation the inspec_version should be a string
   *       in the format of "x.y.z" or "x.y.z-alpha" or "x.y.z-beta",
   *       it must be double quoted, most often the format is "~>#.#"
   * 
   * @returns {string} The YAML string representation of the profile.
   */
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
      //inspec_version: this.inspec_version,
      inspec_version: YAML.stringify(`${this.inspec_version}`, {defaultStringType: 'QUOTE_DOUBLE'}),
    });
  }

  /**
   * Converts the current Profile object to an unformatted version.
   * 
   * This method creates a new Profile instance and iterates over the properties
   * of the current Profile object. If a property value is a string, it applies
   * the `unformatText` function to the value and sets it on the new Profile instance.
   * It also recursively converts the controls of the Profile to their unformatted versions.
   * 
   * @returns {Profile} The unformatted Profile object.
   */
  toUnformattedObject(): Profile {
    const unformattedProfile: Profile = new Profile(this);
    Object.entries(this).forEach(([key, value]) => {
      if (typeof value === 'string') {
        _.set(unformattedProfile, key, unformatText(value));
      }
    });
    unformattedProfile.controls = this.controls.map((control) => control.toUnformattedObject())
    return unformattedProfile;
  }
}
