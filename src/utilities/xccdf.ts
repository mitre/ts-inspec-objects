import {XMLParser} from 'fast-xml-parser'
import {toXML} from 'jstoxml';
import * as htmlparser from 'htmlparser2'
import _ from 'lodash'
import {DecodedDescription} from '../types/xccdf'
import he from 'he'

// const alwaysArray = ['cci_item', 'reference', 'Group', 'group', 'Benchmark', 'Rule', 'title', 'rule', 'version', 'title', '@_id', 'check'];
// 'title',  
//STIG
// const alwaysArray = ['title', 'dc-status', 'description','notice', 'front-matter', 'rear-matter', 'reference', 'plain-text', 'platform', 'metadata', 'Benchmark', 'Group', 'Rule', 'TestResult', 'Value', 'Profile', 'check', 'ident', 'rationale'];
//OVAL
//const alwaysArray = ['object_reference', 'oval-def:definition', 'definition', 'affected', 'reference', 'xsd:any', 'platform', 'product', 'note', 'criteria', 'criterion', 'extend_definition', 'oval-def:test', 'oval-def:object', 'oval-def:filter', 'oval-def:state', 'oval-def:variable', 'possible_value', 'possible_restriction', 'restriction', 'value', 'field', 'definitions', 'generator'];

// arrayMode: () => { 
//   return true;
// }//true  // needs to be updated to isArray https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#isarray

export function convertEncodedXmlIntoJson(
  encodedXml: string
): any {
  const options = {
    ignoreAttributes: false,
    removeNSPrefix: true,
    attributeNamePrefix: '@_',
    stopNodes: ['div', 'p'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isArray: (_name: string, _jpath: string, _isLeafNode: boolean, _isAttribute: boolean) => true,
    // isArray: (_name: string, _jpath: string, isLeafNode: boolean) => {
    //   // if (isLeafNode) {
    //   return true;
    //   // } else {
    //   //   return false;
    //   // }
    // }
  };
  const parser = new XMLParser(options);
  return parser.parse(encodedXml);
}


export function convertJsonIntoXML(data: any) {
  return toXML(data)
}

export function removeXMLSpecialCharacters(str: string) {
  //console.log('Remove special characters: ', JSON.stringify(str, null, 2));
  const result = he.decode(str);
  //console.log('Result of he.decode: ', JSON.stringify(result));
  return result
}

// export function severityStringToImpact(string: string, id: string): number {
export function severityStringToImpact(string: string): number {
  if (RegExp(/none|na|n\/a|not[\s()*_|]?applicable/i).exec(string)?.length) {
    return 0.0
  }

  if (RegExp(/low|cat(egory)?\s*(iii|3)/i).exec(string)?.length) {
    return 0.3
  }

  if (RegExp(/med(ium)?|cat(egory)?\s*(ii|2)/).exec(string)?.length) {
    return 0.5
  }

  if (RegExp(/high|cat(egory)?\s*(i|1)/).exec(string)?.length) {
    return 0.7
  }

  if (RegExp(/crit(ical)?|severe/).exec(string)?.length) {
    return 1.0
  }

  // console.log(`${string} is not a valid severity value. It should be one of the approved keywords. ${id} will be treated as medium severity`)
  return 0.5;
}

export function impactNumberToSeverityString(impact: number): string {
  // Impact must be 0.0 - 1.0
  if (impact < 0.0 || impact > 1.0) {
    throw new Error('Impact cannot be less than 0.0 or greater than 1.0')
  } else {
    if (impact >= 0.9) {
      return 'critical'
    }

    if (impact >= 0.7) {
      return 'high'
    }

    if (impact >= 0.4) {
      return 'medium'
    }

    if (impact >= 0.1) {
      return 'low'
    }

    return 'none'
  }
}

export function convertEncodedHTMLIntoJson(encodedHTML?: string): DecodedDescription {
  if (encodedHTML) {
    // Some STIGs regarding XSS put the < character inside of the description which breaks parsing
    const patchedHTML = encodedHTML.replace(/"&lt;"/g, '[[[REPLACE_LESS_THAN]]]')

    const xmlChunks: string[] = []
    const htmlParser = new htmlparser.Parser({
      ontext(text: string) {
        xmlChunks.push(text)
      },
    })
    htmlParser.write(patchedHTML)
    htmlParser.end()
    const converted = convertEncodedXmlIntoJson(xmlChunks.join(''))
    let cleaned: Record<string, string | boolean | undefined> = {}

    if (typeof converted.VulnDiscussion === 'object') { // Some STIGs have xml tags inside of the actual text which breaks processing, e.g U_ASD_STIG_V5R1_Manual-xccdf.xml and all Oracle Database STIGs
      let extractedVulnDescription = ''
      const remainingFields = _.omit(converted.VulnDiscussion, ['FalsePositives', 'FalseNegatives', 'Documentable', 'Mitigations', 'SeverityOverrideGuidance', 'PotentialImpacts', 'ThirdPartyTools', 'MitigationControl', 'Responsibility', 'IAControls'])
      Object.entries(remainingFields).forEach(([field, value]) => {
        extractedVulnDescription += `<${field}> ${value}`
      })
      cleaned = {
        VulnDiscussion: extractedVulnDescription.replace(/\[\[\[REPLACE_LESS_THAN]]]/, '"<"'),
      }
      Object.entries(converted.VulnDiscussion).forEach(([key, value]) => {
        if (typeof value === 'string') {
          cleaned[key] = value.replace(/\[\[\[REPLACE_LESS_THAN]]]/, '"<"')
        } else {
          cleaned[key] = (value as boolean)
        }
      })
    } else {
      Object.entries(converted).forEach(([key, value]) => {
        if (typeof value === 'string') {
          cleaned[key] = value.replace(/\[\[\[REPLACE_LESS_THAN]]]/, '"<"')
        } else {
          cleaned[key] = (value as boolean)
        }
      })
    }

    return cleaned
  }

  return {}
}