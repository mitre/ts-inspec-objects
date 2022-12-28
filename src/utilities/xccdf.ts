import parser from 'fast-xml-parser'
import {toXML} from 'jstoxml';
import * as htmlparser from 'htmlparser2'
import _ from 'lodash'
import {DecodedDescription} from '../types/xccdf'
import he from 'he'


export function convertEncodedXmlIntoJson(
  encodedXml: string
): any {
  return parser.parse(encodedXml, {
    ignoreAttributes: false,
    ignoreNameSpace: true,
    attributeNamePrefix: '@_',
    stopNodes: ['div', 'p'],
    arrayMode: true
  })
}


export function convertJsonIntoXML(data: any) {
  return toXML(data)
}

export function removeXMLSpecialCharacters(str: string) {
  return he.decode(str)
}

export function severityStringToImpact(string: string, id: string): number {
  if (string.match(/none|na|n\/a|not[\s()*_|]?applicable/i)?.length) {
    return 0.0
  }

  if (string.match(/low|cat(egory)?\s*(iii|3)/i)?.length) {
    return 0.3
  }

  if (string.match(/med(ium)?|cat(egory)?\s*(ii|2)/)?.length) {
    return 0.5
  }

  if (string.match(/high|cat(egory)?\s*(i|1)/)?.length) {
    return 0.7
  }

  if (string.match(/crit(ical)?|severe/)?.length) {
    return 1.0
  }

  console.log(`${string} is not a valid severity value. It should be one of the approved keywords. ${id} will be treated as medium severity`)
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