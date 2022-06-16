import { ExecJSON } from "inspecjs";
import _ from "lodash";
import {flatten, unflatten} from "flat"
import { escapeQuotes, unformatText, wrapAndEscapeQuotes } from "../utilities/global";

export default class Control {
  id?: string | null;
  title?: string | null;
  code?: string | null;
  desc?: string | null;
  descs?: ExecJSON.ControlDescription[] | { [key: string]: string | undefined } | null;
  impact?: number;
  ref?: string;
  refs?: string[];
  tags: {
    check?: string;
    fix?: string;
    severity?: string;
    gtitle?: string;
    gid?: string;
    satisfies?: string[];
    rid?: string;
    stig_id?: string;
    fix_id?: string;
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
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        _.set(this, key, value);
      });
    }
  }

  toUnformattedObject(): Control {
    const flattened: Record<string, string | number> = flatten(this)
    
    Object.entries(flattened).forEach(([key, value]) => {
      if(typeof value === 'string') {
        _.set(flattened, key, unformatText(value));
      }
    });

    return new Control(unflatten(flattened));
  }

  toRuby(lineLength: number = 80) {
    let result = "# encoding: UTF-8\n\n";

    result += `control "${this.id}" do\n`;
    if (this.title) {
      result += `  title "${wrapAndEscapeQuotes(this.title, lineLength)}"\n`;
    } else {
      console.error(`${this.id} does not have a title`);
    }

    if (this.desc) {
      result += `  desc "${wrapAndEscapeQuotes(this.desc, lineLength)}"\n`;
    } else {
      console.error(`${this.id} does not have a desc`);
    }

    if (this.descs) {
      Object.entries(this.descs).forEach(([key, desc]) => {
        if (desc) {
          result += `  desc "${key}", "${wrapAndEscapeQuotes(
            desc,
            lineLength
          )}"\n`;
        } else {
          console.error(`${this.id} does not have a desc for the value ${key}`);
        }
      });
    }

    if (this.impact) {
      result += `  impact ${this.impact}\n`;
    } else {
      console.error(`${this.id} does not have an impact`);
    }

    if (this.refs) {
      this.refs.forEach((ref) => {
        result += `  ref '${escapeQuotes(ref)}'\n`;
      });
    }

    Object.entries(this.tags).forEach(([tag, value]) => {
      if (value) {
        if (typeof value === "object") {
          if (Array.isArray(value) && typeof value[0] === "string") {
            result += `  tag ${tag}: ${JSON.stringify(value)}\n`;
          } else {
            // Convert JSON Object to Ruby Hash
            const stringifiedObject = JSON.stringify(value, null, 2)
              .replace(/\n/g, "\n  ")
              .replace(/\{\n {6}/g, "{")
              .replace(/\[\n {8}/g, "[")
              .replace(/\n {6}\]/g, "]")
              .replace(/\n {4}\}/g, "}")
              .replace(/": \[/g, '" => [');
            result += `  tag ${tag}: ${stringifiedObject}\n`;
          }
        } else if (typeof value === "string") {
          result += `  tag ${tag}: "${wrapAndEscapeQuotes(
            value,
            lineLength
          )}"\n`;
        }
      }
    });
    result += "end";

    return result;
  }
}
