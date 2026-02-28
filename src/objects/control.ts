import _ from 'lodash';
import type { ExecJSON } from 'inspecjs';
import { escapeQuotes } from '../utilities/global';
import { createWinstonLogger } from '../utilities/logging';

/**
 * Converts an array of ExecJSON.ControlDescription objects or a dictionary of descriptions
 * into a standardized dictionary format.
 *
 * @param descs - An array of ExecJSON.ControlDescription objects, a dictionary of descriptions,
 *                or null/undefined.
 * @returns A dictionary where the keys are description labels and the values are description data.
 *          If the input is null or undefined, an empty dictionary is returned.
 */
export function objectifyDescriptions(descs: ExecJSON.ControlDescription[] | Record<string, string | undefined> | null | undefined): Record<string, string | undefined> {
  if (Array.isArray(descs)) {
    const descriptions: Record<string, string | undefined> = {};
    for (const description of descs) {
      descriptions[description.label] = description.data;
    }
    return descriptions;
  }
  return descs || {};
}

/**
 * Represents a Control object with various properties and methods to manipulate and convert it.
 *
 * @class Control
 * @property {string} id - The unique identifier for the control.
 * @property {string | null} [title] - The title of the control.
 * @property {string | null} [code] - The code associated with the control.
 * @property {string | null} [describe] - Additional description content for the control.
 * @property {string | null} [desc] - The default description of the control.
 * @property {Object.<string, string | undefined>} descs - Additional descriptions for the control.
 * @property {number} [impact] - The impact value of the control.
 * @property {string} [ref] - A reference string for the control.
 * @property {(string | { ref?: string; url?: string; uri?: string; })[]} [refs] - An array of references for the control.
 * @property {Object.<string, string | string[] | Record<string, string[]>[] | boolean | undefined | null>} tags - Tags associated with the control.
 *
 * @constructor
 * @param {Partial<Control>} [data] - An optional partial object of type Control to initialize the instance with.
 *
 * @method toUnformattedObject
 * @method toString
 * @method toRuby
 */
export default class Control {
  declare id: string;
  declare title?: string | null;
  declare code?: string | null;
  declare describe?: string | null;
  declare desc?: string | null;
  declare descs: Record<string, string | undefined>;
  declare impact?: number;
  declare ref?: string;
  declare refs?: (string | {
    ref?: string;
    url?: string;
    uri?: string;
  })[];

  declare tags: {
    check?: string;
    check_id?: string;
    fix?: string;
    fix_id?: string | null;
    severity?: string;
    gtitle?: string;
    gid?: string;
    satisfies?: string[];
    rid?: string;
    stig_id?: string;
    cci?: string[];
    cis_controls?: Record<string, string[]>[];
    nist?: string[];
    legacy?: string[];
    false_negatives?: string;
    false_positives?: string;
    documentable?: boolean;
    mitigations?: string;
    severity_override_guidance?: string;
    potential_impacts?: string;
    third_party_tools?: string;
    mitigation_controls?: string;
    responsibility?: string;
    ia_controls?: string;
    [key: string]: string | string[] | Record<string, string[]>[] | boolean | undefined | null;
  };

  /**
   * Constructs a new instance of the Control class.
   *
   * @param data - An optional partial object of type Control to initialize the instance with.
   *               If provided, the properties of the data object will be assigned to the instance.
   */
  constructor(data?: Partial<Control>) {
    this.refs = [];
    this.tags = {};
    if (data) {
      for (const [key, value] of Object.entries(structuredClone(data))) {
        _.set(this, key, value);
      }
    }
  }

  /**
   * Converts the current Control object into an unformatted object.
   * The method flattens the object, processes its string properties,
   * and then unflattens it back into a Control object.
   *
   * @returns {Control} A new Control object created from the unformatted data.
   */
  toUnformattedObject(): Control {
    return new Control(this);
  }

  /**
   * Converts the control object to a string representation in a specific format.
   * Provides the ability to get the control in its raw form
   *
   * The resulting string includes:
   * - The control ID.
   * - The title, if present.
   * - The default description, if present.
   * - Additional descriptions, if present.
   * - The impact value, if present.
   * - References, if present.
   * - Tags, if present.
   * - Additional describe content, if present.
   *
   * @returns {string} The string representation of the control object.
   */
  toString(): string {
    let result = '';
    result += `control '${this.id}' do\n`;

    if (this.title) {
      result += `  title "${this.title}"\n`;
    }
    // This is the known 'default' description - on previous version this content was repeated on descriptions processed by "descs"
    if (this.desc) {
      result += `  desc "${this.desc}"\n`;
    }

    if (this.descs) {
      for (const [key, subDesc] of Object.entries(this.descs)) {
        if (subDesc) {
          result += `  desc '${key}', "${subDesc}"\n`;
        }
      }
    }

    if (this.impact) {
      result += `  impact ${this.impact}\n`;
    } else if (this.impact === 0) {
      result += `  impact ${this.impact.toFixed(1)}\n`;
    }

    if (this.refs) {
      for (const ref of this.refs) {
        result += typeof ref === 'string' ? `  ref "${ref}"\n` : `  ref ${ref.ref?.toString() || ''}, url: ${ref.url || ''}`;
      }
    }

    for (const [tag, value] of Object.entries(this.tags)) {
      if (typeof value === 'object') {
        result += Array.isArray(value) && typeof value[0] === 'string' ? `  tag ${tag}: ${JSON.stringify(value)}\n` : `  tag '${tag}': ${(value == undefined ? 'nil' : JSON.stringify(value))}\n`;
      } else if (typeof value === 'string') {
        result += value.includes('"') ? `  tag "${tag}": "${value}"\n` : `  tag '${tag}': '${value}'\n`;
      }
    }

    if (this.describe) {
      result += '\n';
      result += this.describe;
    }

    if (!(result.slice(-1).includes('\n'))) {
      result += '\n';
    }
    result += 'end\n';

    return result;
  }

  /**
   * Converts the control object to a Ruby string representation.
   *
   * @param {boolean} [verbose=false] - If true, logs detailed error and warning messages.
   * @returns {string} The Ruby string representation of the control object.
   *
   * The generated Ruby string includes:
   * - `control` block with the control ID.
   * - `title` if available, otherwise logs an error if verbose is true.
   * - `desc` if available, otherwise logs an error if verbose is true.
   * - Additional descriptions (`descs`) if available, with special handling for the 'default' keyword.
   * - `impact` if defined, otherwise logs an error if verbose is true.
   * - `refs` if available, with support for both string and object references.
   * - `tags` if available, with special formatting for arrays and objects, and handling for nil values for specific tags.
   * - `describe` if available, appended at the end of the control block.
   *
   * The function ensures proper formatting and escaping of quotes for Ruby syntax.
   */
  toRuby(verbose = false): string {
    const logger = createWinstonLogger();
    let result = '';

    result += `control '${this.id}' do\n`;
    if (this.title) {
      result += `  title ${escapeQuotes(this.title)}\n`;
    } else if (verbose) {
      logger.error(`${this.id} does not have a title`);
    }

    // This is the known 'default' description - on previous version this content was repeated on descriptions processed by "descs"
    if (this.desc) {
      result += `  desc ${escapeQuotes(this.desc)}\n`;
    } else if (verbose) {
      logger.error(`${this.id} does not have a desc`);
    }

    if (this.descs) {
      for (const [key, subDesc] of Object.entries(this.descs)) {
        if (subDesc) {
          if ((key.includes('default')) && this.desc) {
            // The "default" keyword may have the same content as the desc content for backward compatibility with different historical InSpec versions.
            // In that case, we can ignore writing the "default" subdescription field.
            // If they are different, however, someone may be trying to use the keyword "default" for a unique subdescription, which should not be done.
            if (subDesc != this.desc && verbose) {
              logger.error(`${this.id} has a subdescription called "default" with contents that do not match the main description. "Default" should not be used as a keyword for unique sub-descriptions.`);
            }
          } else {
            result += `  desc '${key}', ${escapeQuotes(subDesc)}\n`;
          }
        } else if (verbose) {
          logger.warn(`${this.id} does not have a desc for the value ${key}`);
        }
      }
    }

    if (this.impact !== undefined) {
      result += `  impact ${(this.impact <= 0 ? this.impact.toFixed(1) : this.impact)}\n`;
    } else if (verbose) {
      logger.error(`${this.id} does not have an impact`);
    }

    // -------------------------------------------------------------------------
    // This may not be necessary, leaving commented code for posterity. Once we
    // have implemented the process and determined that there isn't any side
    // effects we can remove the commented code
    // -------------------------------------------------------------------------
    // if (this.refs) {
    //   this.refs.forEach((ref) => {
    //     if (typeof ref === 'string') {
    //       result += `  ref ${escapeQuotes(ref)}\n`;
    //     } else {
    //       result += `  ref ${escapeQuotes(ref.ref?.toString() || '')}, url: ${escapeQuotes(ref.url || '')}`
    //     }
    //   });
    // }

    for (const [tag, value] of Object.entries(this.tags)) {
      if (value) {
        if (typeof value === 'object') {
          if (Array.isArray(value) && typeof value[0] === 'string') {
            // The goal is to keep the style similar to cookstyle formatting
            result += `  tag ${tag}: ${JSON.stringify(value)
              .replaceAll('"', "'") // replace the double quotes with single quotes, ex: ["V-72029","SV-86653"] -> ['V-72029','SV-86653']
              .split("','") // split the items in the string
              .join("', '")}\n`; // join them together using single quote and a space, ex: ['V-72029','SV-86653'] -> ['V-72029', 'SV-86653']
          } else {
            // Convert JSON Object to Ruby Hash
            const stringifiedObject = JSON.stringify(value, null, 2)
              .replaceAll('\n', '\n  ')
              .replaceAll(/\{\n {6}/g, '{')
              .replaceAll(/\[\n {8}/g, '[')
              .replaceAll(/\n {6}\]/g, ']')
              .replaceAll(/\n {4}\}/g, '}')
              .replaceAll('": [', '" => [');
            result += `  tag ${tag}: ${stringifiedObject}\n`;
          }
        } else if (typeof value === 'string') {
          result += `  tag ${tag}: ${escapeQuotes(value)}\n`;
        }
      } else {
        const nilTagList = ['severity', 'satisfies'];
        result += nilTagList.includes(tag) ? `  tag ${tag}: nil\n` : `  tag '${tag}'\n`;
        if (verbose) {
          logger.info(`${this.id} does not have a value for tag: ${tag}`);
        }
      }
    }

    if (this.describe) {
      result += '\n';
      result += this.describe;
    }

    if (!(result.slice(-1).includes('\n'))) {
      result += '\n';
    }
    result += 'end\n';

    return result;
  }
}
