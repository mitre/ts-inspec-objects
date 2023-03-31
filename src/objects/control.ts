import _ from 'lodash';
import {ExecJSON} from 'inspecjs';
import {flatten, unflatten} from 'flat'
import {escapeQuotes} from '../utilities/global';
import {createWinstonLogger} from '../utilities/logging';

export function objectifyDescriptions(descs: ExecJSON.ControlDescription[] | { [key: string]: string | undefined } | null | undefined): { [key: string]: string | undefined } {
  if (Array.isArray(descs)) {
    const descriptions: Record<string, string | undefined> = {}
    descs.forEach((description) => {
      descriptions[description.label] = description.data
    })
    return descriptions
  }
  return descs || {}
}

export default class Control {
  id!: string;
  title?: string | null;
  code?: string | null;
  describe?: string | null;
  desc?: string | null;
  descs!: { [key: string]: string | undefined };
  impact?: number;
  ref?: string;
  refs?: (string | {
    ref?: string;
    url?: string;
    uri?: string;
  })[];
  tags: {
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
    [key: string]:
      | string
      | string[]
      | Record<string, string[]>[]
      | boolean
      | undefined
      | null;
  } = {};

  constructor(data?: Partial<Control>) {
    this.refs = []
    this.tags = {}
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        _.set(this, key, value);
      });
    }
  }

  toUnformattedObject(): Control {
    const flattened: Record<string, string | number> = flatten(this)
    
    Object.entries(flattened).forEach(([key, value]) => {
      if (typeof value === 'string') {
        _.set(flattened, key, value);
      }
    });

    return new Control(unflatten(flattened));
  }

  // WIP - provides the ability to get the control in its raw form
  toString() {
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
      Object.entries(this.descs).forEach(([key, subDesc]) => {
        if (subDesc) {
          result += `  desc '${key}', "${subDesc}"\n`;
        }
      });
    }

    if (this.impact) {
      result += `  impact ${this.impact}\n`;
    }

    if (this.refs) {
      this.refs.forEach((ref) => {
        if (typeof ref === 'string') {
          result += `  ref "${ref}"\n`;
        } else {
          result += `  ref ${ref.ref?.toString() || ''}, url: ${ref.url || ''}`
        }
      });
    }

    Object.entries(this.tags).forEach(([tag, value]) => {
      if (typeof value === 'object') {
        if (Array.isArray(value) && typeof value[0] === 'string') {
          result += `  tag ${tag}: ${JSON.stringify(value)}\n`
        } else {
          result += `  tag '${tag}': ${(value==null?'nil':value)}\n`
        }
      } else if (typeof value === 'string') {
        if (value.includes('"')) {
          result += `  tag "${tag}": "${value}"\n`;
        } else {
          result += `  tag '${tag}': '${value}'\n`;
        }
      }
    });

    if (this.describe) {
      result += '\n';
      result += this.describe
    }

    if (!result.slice(-1).match('\n')) {
      result += '\n';
    }
    result += 'end\n';

    return result;
  }

  toRuby(verbose = true) {
    const logger = createWinstonLogger();
    let result = '';

    result += `control '${this.id}' do\n`;
    if (this.title) {
      result += `  title ${escapeQuotes(this.title)}\n`;
    } else {
      if (verbose) {logger.error(`${this.id} does not have a title`);}
    }

    // This is the known 'default' description - on previous version this content was repeated on descriptions processed by "descs"
    if (this.desc) {
      result += `  desc ${escapeQuotes(this.desc)}\n`;
    } else {
      if (verbose) {logger.error(`${this.id} does not have a desc`);}
    }

    if (this.descs) {
      Object.entries(this.descs).forEach(([key, subDesc]) => {
        if (subDesc) {
          if (key.match('default') && this.desc) {
            if (subDesc != this.desc) {
              // The "default" keyword may have the same content as the desc content for backward compatibility with different historical InSpec versions.
              // In that case, we can ignore writing the "default" subdescription field.
              // If they are different, however, someone may be trying to use the keyword "default" for a unique subdescription, which should not be done.
              if (verbose) {logger.error(`${this.id} has a subdescription called "default" with contents that do not match the main description. "Default" should not be used as a keyword for unique sub-descriptions.`);}
            }
          }
          else {
            result += `  desc '${key}', ${escapeQuotes(subDesc)}\n`;
          }
        } else {
          if (verbose) {logger.error(`${this.id} does not have a desc for the value ${key}`);}
        }
      });
    }

    if (this.impact !== undefined) {
      result += `  impact ${(this.impact<=0?this.impact.toFixed(1):this.impact)}\n`
    } else {
      if (verbose) {logger.error(`${this.id} does not have an impact`);}
    }

    if (this.refs) {
      this.refs.forEach((ref) => {
        if (typeof ref === 'string') {
          result += `  ref ${escapeQuotes(ref)}\n`;
        } else {
          result += `  ref ${escapeQuotes(ref.ref?.toString() || '')}, url: ${escapeQuotes(ref.url || '')}`
        }

      });
    }

    Object.entries(this.tags).forEach(([tag, value]) => {
      if (value) {
        if (typeof value === 'object') {
          if (Array.isArray(value) && typeof value[0] === 'string') {
            // The goal is to keep the style similar to cookstyle formatting
            result += `  tag ${tag}: ${JSON.stringify(value)
              .replace(/"/g, "'") // replace the double quotes with single quotes, ex: ["V-72029","SV-86653"] -> ['V-72029','SV-86653']
              .split("','")        // split the items in the string
              .join("', '")}\n`    // join them together using single quote and a space, ex: ['V-72029','SV-86653'] -> ['V-72029', 'SV-86653']
          } else {
            // Convert JSON Object to Ruby Hash
            const stringifiedObject = JSON.stringify(value, null, 2)
              .replace(/\n/g, '\n  ')
              .replace(/\{\n {6}/g, '{')
              .replace(/\[\n {8}/g, '[')
              .replace(/\n {6}\]/g, ']')
              .replace(/\n {4}\}/g, '}')
              .replace(/": \[/g, '" => [');
            result += `  tag ${tag}: ${stringifiedObject}\n`;
          }
        } else if (typeof value === 'string') {
          result += `  tag ${tag}: ${escapeQuotes(value)}\n`;
        }
      } else {
        result += `  tag ${tag}: nil\n`;
      }
    });

    if (this.describe) {
      result += '\n';
      result += this.describe
    }

    if (!result.slice(-1).match('\n')) {
      result += '\n';
    }
    result += 'end\n';

    return result;
  }
}
