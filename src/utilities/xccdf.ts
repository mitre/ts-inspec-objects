import {XMLParser} from 'fast-xml-parser'
import {toXML} from 'jstoxml';
import * as htmlparser from 'htmlparser2'
import _ from 'lodash'
import {DecodedDescription} from '../types/xccdf'
import he from 'he'

/**
 * Converts an encoded XML string into a JSON object using specified
 * parsing options.
 * 
 * @param encodedXml      - The encoded XML string to be converted.
 * @param xmlParserOption - The parsing option to be used. Defaults to
 *                          'withArrayOption'.
 *   Possible values are:
 *     - 'withArrayOption': Parses XML with array option enabled.
 *     - 'withArrayNoEntitiesOption': Parses XML with array option
 *       enabled and processes entities.
 *     - Any other value: Parses XML without array option.
 * @returns The JSON representation of the XML string.
 *
 * @remarks
 * This function uses the `fast-xml-parser` library to parse the XML string.
 * The parser options are configured to:
 * - Prevent the parser from converting XML entities (converting &lt into <)
 * - Ignore attributes, allow or disallows attributes to be parsed 
 * - Remove namespace prefixes.
 * - Prefix attribute names with '@_'.
 * - Stop parsing 'div' and 'p' tags.
 * - Treat all nodes as arrays or not
 *
 * Options being used for the XML parser (V4) are:
 *  - processEntities: true or false (based on xmlParserOption)
 *  - ignoreAttributes: false (allow attributes to be parsed)
 *  - removeNSPrefix: true (remove namespace prefixes)
 *  - attributeNamePrefix: '@_' (prefix all attribute names with @_)
 *  - stopNodes: ["*.pre", "*.p"]
 *  - isArray(): true or false (based on xmlParserOption)
 * 
 * NOTE: The isArray can specify what tags to always convert into an array, we
 *       do not specify specific fields as it could break parsing if future
 *       fields are added, we parse all fields as an array.
 * 
 * For more details on the parser options, see the documentation for the v4 or v5 version of the library:
 * {@link https://github.com/NaturalIntelligence/fast-xml-parser/tree/master/docs/v4}
 */
/**
 * Converts an encoded XML string into a JSON object using specified parsing options.
 *
 * @param encodedXml - The encoded XML string to be converted.
 * @param xmlParserOption - The parsing option to be used. Defaults to 'withArrayOption'.
 *                          Possible values are:
 *                          - 'withArrayOption': Parses XML with array option enabled.
 *                          - 'withArrayNoEntitiesOption': Parses XML with array option enabled and processes entities.
 *                          - Any other value: Parses XML without array option.
 * @returns The JSON object resulting from the XML parsing.
 */
export function convertEncodedXmlIntoJson(encodedXml: string, xmlParserOption: string = 'withArrayOption'): any {

  const withArrayOption = {
    processEntities: false,
    ignoreAttributes: false,
    removeNSPrefix: true,
    attributeNamePrefix: '@_',
    stopNodes: ['*.div', '*.p'],
    isArray: () => true,
  };

  const withArrayNoEntitiesOption = {
    processEntities: true,
    ignoreAttributes: false,
    removeNSPrefix: true,
    attributeNamePrefix: '@_',
    stopNodes: ['*.div', '*.p'],
    isArray: () => true,
  };

  const noArrayOption = {
    processEntities: false,
    ignoreAttributes: false,
    removeNSPrefix: true,
    attributeNamePrefix: '@_',
    stopNodes: ['*.div', '*.p'],
    isArray: () => false,
  };

  const parser = new XMLParser(
    xmlParserOption === 'withArrayOption' 
      ? withArrayOption 
      : xmlParserOption === 'withArrayNoEntitiesOption' 
        ? withArrayNoEntitiesOption
        : noArrayOption)
  
  return parser.parse(encodedXml);
}

/**
 * Converts a JSON object into an XML string.
 *
 * @param data - The JSON object to be converted.
 * @returns The XML string representation of the JSON object.
 */
export function convertJsonIntoXML(data: any) {
  return toXML(data)
}

/**
 * Removes XML special characters from a given string.
 *
 * This function decodes any XML special characters in the input string
 * and returns the decoded result.
 *
 * @param str - The input string containing XML special characters.
 * @returns The decoded string with XML special characters removed.
 */
export function removeXMLSpecialCharacters(str: string) {
  const result = he.decode(str);
  return result
}

/**
 * Removes all of the HTML tags and leaves only the text content.
  *
 * @param input - The string from which HTML tags should be removed.
 * @returns A new string with all HTML tags removed.
 * 
 * @example
 * ```typescript
 * const str = '<div>Hello <b>World</b>!</div>';
 * const stripped = removeHtmlTags(str);
 * console.log(stripped); // Output: "Hello World!"
 * ```
 */
export function removeHtmlTags(input: string): string {
  // Regex explained
  //    <: Matches the opening angle bracket of an HTML tag
  //   /?: Matches zero or one forward slash /, to include closing tags
  // [^>]: Matches any character except the > symbol
  //    +: Ensures preceding pattern ([^>]) matches one or more characters
  // (>|$):
  //   > matches the closing angle bracket of an HTML tag.
  //   $ matches the end of the string. This ensures the regex can handle
  //     cases where the tag is incomplete or unclosed (e.g., <div)
  // g: Global flag to find all matches in the input string
  return input.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Converts a severity string to a numerical impact value.
 *
 * The function matches the input string against various regular expressions
 * to determine the corresponding impact value:
 * - "none", "na", "n/a", "not applicable" (case insensitive) -> 0.0
 * - "low", "category iii", "category 3" (case insensitive) -> 0.3
 * - "medium", "category ii", "category 2" -> 0.5
 * - "high", "category i", "category 1" -> 0.7
 * - "critical", "severe" -> 1.0
 *
 * If no match is found, the default impact value is 0.5.
 *
 * @param string - The severity string to be converted.
 * @returns The numerical impact value corresponding to the severity string.
 */
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

  return 0.5;
}

/**
 * Converts an impact number to a severity string.
 *
 * @param impact - A number representing the impact, which must be between 0.0 and 1.0 inclusive.
 * @returns A string representing the severity level:
 * - 'critical' for impact >= 0.9
 * - 'high' for impact >= 0.7
 * - 'medium' for impact >= 0.4
 * - 'low' for impact >= 0.1
 * - 'none' for impact < 0.1
 * @throws {Error} If the impact is less than 0.0 or greater than 1.0.
 */
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

/**
 * Converts an encoded HTML string into a JSON object, handling specific edge
 * cases related to XSS and XML tags.
 *
 * This function performs the following steps:
 * 1. Replaces occurrences of `"&lt;"` with a placeholder to avoid
 *    breaking parsing.
 * 2. Parses the patched HTML to extract text chunks.
 * 3. Converts the extracted text chunks into JSON.
 * 4. Cleans the converted JSON by replacing placeholders with the original
 *    characters and handling nested objects.
 *
 * Note: This function specifically addresses issues found in certain
 *       STIGs (Security Technical Implementation Guides) where XML tags are
 *       embedded within text fields.
 * 
 * @param encodedHTML - The encoded HTML string to be converted. 
 *                      If not provided, an empty object is returned.
 * @returns A `DecodedDescription` object containing the converted JSON data.
 */
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
    const converted = convertEncodedXmlIntoJson(xmlChunks.join(''), 'noArrayOption')
    let cleaned: Record<string, string | boolean | undefined> = {}

    // Some STIGs have xml tags inside of the actual text which breaks processing,
    // e.g U_ASD_STIG_V5R1_Manual-xccdf.xml and all Oracle Database STIGs
    if (typeof converted.VulnDiscussion === 'object') { 
      let extractedVulnDescription = ''
      const remainingFields = _.omit(converted.VulnDiscussion,
        [
          'FalsePositives', 'FalseNegatives', 'Documentable', 'Mitigations',
          'SeverityOverrideGuidance', 'PotentialImpacts', 'ThirdPartyTools',
          'MitigationControl', 'Responsibility', 'IAControls'
        ]
      )
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
