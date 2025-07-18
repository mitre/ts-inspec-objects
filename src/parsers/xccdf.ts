import Profile from '../objects/profile';
import {
  convertEncodedHTMLIntoJson, convertEncodedXmlIntoJson,
  convertJsonIntoXML, impactNumberToSeverityString,
  removeHtmlTags, removeXMLSpecialCharacters, severityStringToImpact
} from '../utilities/xccdf';
import {BenchmarkGroup, BenchmarkRule, DecodedDescription,
  FrontMatter, Notice, ParsedXCCDF, RationaleElement,
  RuleComplexCheck} from '../types/xccdf';
import Control from '../objects/control';
import _ from 'lodash';
import {OvalDefinitionValue} from '../types/oval';
import {data as CciNistMappingData} from '../mappings/CciNistMappingData'
import pretty from 'pretty'
import {createWinstonLogger} from '../utilities/logging'

export type GroupContextualizedRule = BenchmarkRule & {group: Omit<BenchmarkGroup, 'Rule' | 'Group'>}

/**
 * Extracts all rules from the given benchmark groups, including nested groups.
 *
 * @param groups - An array of benchmark groups to extract rules from.
 * @returns An array of contextualized rules, each rule includes its parent group context.
 */
export function extractAllRules(groups: BenchmarkGroup[]): GroupContextualizedRule[] {
  const rules: GroupContextualizedRule[] = [];
  groups.forEach((group) => {
    if (group.Rule) {
      rules.push(...(group.Rule.map((rule) => {
        return {
          ...rule,
          group: _.omit(group, ['Rule', 'Group'])
        }
      })))
    }
    if (group.Group) {
      rules.push(...extractAllRules(group.Group))
    }
  })
  return rules
}

/**
 * Extracts all nested complex checks from a given `RuleComplexCheck` object.
 * 
 * This function recursively traverses the `complex-check` property of the input
 * `RuleComplexCheck` object and collects all nested complex checks into a flat array.
 * Each complex check in the resulting array will have its own `complex-check` property omitted.
 * 
 * @param complexCheck - The `RuleComplexCheck` object to extract complex checks from.
 * @returns An array of `RuleComplexCheck` objects with the `complex-check` property omitted.
 */
export function extractAllComplexChecks(complexCheck: RuleComplexCheck): Omit<RuleComplexCheck, 'complex-check'>[] {
  const complexChecks: Omit<RuleComplexCheck, 'complex-check'>[] = [_.omit(complexCheck, 'complex-check')];
  if (complexCheck['complex-check']) {
    complexChecks.push(...complexCheck['complex-check'].map((subComplexCheck) => _.omit(subComplexCheck, 'complex-check')));
    complexCheck['complex-check'].forEach((subComplexCheck) => {
      complexChecks.push(...extractAllComplexChecks(subComplexCheck))
    })
  }
  return complexChecks
}

export type InputTextLang = {
  '#text': string; 
  '@_lang': string
}

/**
 * Ensures that the input is decoded to a string value.
 * 
 * This function takes an input which can be either a string or an array of `InputTextLang` objects.
 * If the input is a string, it returns the input as is.
 * If the input is an array, it attempts to retrieve the `#text` property from the first element of the array.
 * If the input is neither a string nor an array, it attempts to retrieve the `#text` property from the input.
 * If the `#text` property is not found, it returns the provided default value.
 * 
 * @param input - The input value which can be a string or an array of `InputTextLang` objects.
 * @param defaultValue - The default value to return if the `#text` property is not found.
 * @returns The decoded string value or the default value.
 */
function ensureDecodedXMLStringValue(input: string | InputTextLang[], defaultValue: string): string {
  return _.isString(input)
    ? input 
    : _.isArray(input)
      ? _.get(input, '[0].#text', defaultValue)
      : _.get(input, '#text', defaultValue)
}

/**
 * Processes an XCCDF (Extensible Configuration Checklist Description Format) XML
 * string and converts it into a Profile object.
 * NOTE: We are using the fast xml parser (FXP) V4 which requires to specify
 *       which Whether a single tag should be parsed as an array or an object,
 *       it can't be decided by FXP. We process every tag as an array, this is
 *       the reason there are numerous tag test, were array index zero [0] is
 *       tested.
 * 
 * @param xml - The XCCDF XML string to process.
 * @param removeNewlines - A flag indicating whether to remove newlines from the processed data.
 * @param useRuleId - Specifies the rule ID format to use. Can be 'group', 'rule', 'version', or 'cis'.
 * @param ovalDefinitions - Optional OVAL definitions to use for resolving values.
 * @returns A Profile object representing the processed XCCDF data.
 * @throws Will throw an error if the XCCDF file is not properly formatted or if required data is missing.
 */
export function processXCCDF(xml: string, removeNewlines: false,
  useRuleId: 'group' | 'rule' | 'version' | 'cis',
  ovalDefinitions?: Record<string,
  OvalDefinitionValue & { criteriaRefs?: string[]; resolvedValues?: any }>): Profile {
  
  const logger = createWinstonLogger('ts-inspec-objects')
  const parsedXML: ParsedXCCDF = convertEncodedXmlIntoJson(xml)

  if (parsedXML.Benchmark === undefined) {
    throw new Error('Could not process the XCCDF file, check the input to make sure this is a properly formatted XCCDF file.')
  }

  // Extracts all rules from the given benchmark groups.
  const rules = extractAllRules(parsedXML.Benchmark[0].Group)

  // Variable used to store the profile data.
  // The name is the benchmark Id, title and summary are from benchmark.
  const profile = new Profile({
    //name: parsedXML.Benchmark[0]['@_id'],
    // title: (parsedXML.Benchmark[0].title[0] as FrontMatter)['#text'],
    // summary: (parsedXML.Benchmark[0].description[0] as RationaleElement)['#text']
    name: Array.isArray(parsedXML.Benchmark[0]['@_id'])
      ? parsedXML.Benchmark[0]['@_id'].map(n => (n as FrontMatter)['@_id']).join(' ') === ''
        ? parsedXML.Benchmark[0]['@_id'].map(n => (n as string[])).join(' ')
        : parsedXML.Benchmark[0]['@_id'].join(' ')
      : parsedXML.Benchmark[0]['@_id'],
    title: Array.isArray(parsedXML.Benchmark[0].title)
      ? parsedXML.Benchmark[0].title.map(t => (t as FrontMatter)['#text']).join(' ') === ''
        ? parsedXML.Benchmark[0].title.map(t => (t as unknown as string[])).join(' ')
        : parsedXML.Benchmark[0].title.map(t => (t as FrontMatter)['#text']).join(' ')
      : parsedXML.Benchmark[0].title,
    summary: Array.isArray(parsedXML.Benchmark[0].description)
      ? parsedXML.Benchmark[0].description.map(d => (d as RationaleElement)['#text']).join(' ') === ''
        ? parsedXML.Benchmark[0].description.map(d => (d as RationaleElement)['p'] || '').join(' ') === ''
          ? parsedXML.Benchmark[0].description.map(d => (d as unknown as string[])).join(' ')
          : parsedXML.Benchmark[0].description.map(d => (d as RationaleElement)['p'] || '').join(' ')
        : parsedXML.Benchmark[0].description.map(d => (d as RationaleElement)['#text']).join(' ')
      : parsedXML.Benchmark[0].description
  });
  
  // Process each rule, extracting the necessary
  // data and save it to the profile variable.
  rules.forEach(rule => {
    // The description tag contains the following tags:
    //   "FalsePositives", "FalseNegatives", "Documentable", "Mitigations",
    //   "SeverityOverrideGuidance", "PotentialImpacts", "ThirdPartyTools",
    //   "MitigationControl", "Responsibility", "IAControls"
    let extractedDescription: string | DecodedDescription;
    if (typeof rule.description === 'object') {
      if (Array.isArray(rule.description) && _.get(rule, "description[0]['#text']")) {
        extractedDescription = rule.description[0]['#text']
      } else {
        if (typeof _.get(rule.description, '[0].p') === 'string') {
          extractedDescription = pretty(_.get(rule.description, '[0].p'))
        } else {
          if (Array.isArray(_.get(rule.description, '[0].p'))) {
            const joinedDescriptions: string[] = (_.get(rule.description, '[0].p') as string[])
            extractedDescription = pretty(joinedDescriptions.join('\n\n'))
            extractedDescription = removeHtmlTags(extractedDescription).replace('\n',' ')
          } else if (Array.isArray(rule.description)) {
            extractedDescription = convertEncodedHTMLIntoJson(rule.description[0])
          } else {
            extractedDescription = JSON.stringify(rule.description)
          }
        }
      }
    } else {
      extractedDescription = convertEncodedHTMLIntoJson(rule.description)
    }

    // Create a new control object and populate it with the necessary data.
    const control = new Control();

    // Update the control Id with the appropriate value based on the rule id.
    switch (useRuleId) {
      case 'group':
        control.id = rule.group['@_id'].toString()
        break;
      case 'rule':
        if (rule['@_id'][0].toLowerCase().startsWith('sv')) {
          control.id = rule['@_id'][0].split('r')[0]
        } else {
          control.id = rule['@_id'][0]
        }
        break;
      case 'version':
        if (rule.version !== undefined) {
          control.id = (_.isArray(rule.version)) ? rule.version[0] : rule.version
        } else {
          throw new Error('The rule type "version" did not provide an identification (Id) value')
        }
        break;
      case 'cis': {
        // Regex explained
        // \d:
        //     matches a single digit (0-9), the required starting point of the match.
        // (\d?):
        //     matches an optional digit, there are three of these in sequence
        // (.\d(\d?)(\d?)(\d?))?:
        //     matches an optional group that starts with a period (.) followed
        //     by one digit and up to three additional optional digits
        // The pattern is repeated four times to match between zero and four
        // groups of a period followed by one required digit and up to three
        // additional optional digits. The pattern matches:
        // 1, 123, 1.2, 1.234, 1.2.3.4.5, or 1.23.456.7.89
        const controlIdRegex = /\d(\d?)(\d?)(\d?)(.\d(\d?)(\d?)(\d?))?(.\d(\d?)(\d?)(\d?))?(.\d(\d?)(\d?)(\d?))?(.\d(\d?)(\d?)(\d?))?/g
        const controlIdMatch = controlIdRegex.exec(rule['@_id'])

        if (controlIdMatch) {
          control.id = controlIdMatch[0]
        } else {
          throw new Error(`Could not parse control ID from rule ID: ${rule['@_id']}. Expecting something in this example format: xccdf_org.cisecurity.benchmarks_rule_1.1.11_Rule_title_summary`)
        }
        break;
      }
      default:
        throw new Error('useRuleId must be one of "group", "rule", "version" for STIG benchmarks, or "cis" for CIS benchmarks')
    }

    if (!(_.isArray(rule.title) && rule.title.length === 1)) {
      throw new Error('Rule title is not an array of length 1. Investigate if the file is in the proper format.')
    }
    
    // Update the control title with the rule.tile content if a rule severity
    // exists after removing any special characters, otherwise set the control
    // title to [[[MISSING SEVERITY FROM BENCHMARK]]], undefined title.
    control.title = removeXMLSpecialCharacters(rule['@_severity'] || rule['@_weight']
      ? ensureDecodedXMLStringValue(rule.title[0], 'undefined title')
      : `[[[MISSING SEVERITY or WEIGHT FROM BENCHMARK]]] ${ensureDecodedXMLStringValue(rule.title[0],'undefined title')}`)

    // Update the control description (desc) with the extracted description content
    if (typeof extractedDescription === 'object' && !Array.isArray(extractedDescription)) {
      control.desc = extractedDescription.VulnDiscussion?.split('Satisfies: ')[0] || ''
    } else if (typeof extractedDescription === 'object') { 
      control.desc = JSON.stringify(extractedDescription)
    } else if (typeof extractedDescription === 'string') {
      control.desc = extractedDescription || ''
    } else {
      logger.warn(`Invalid value for extracted description: ${extractedDescription}`)
    }

    // Update the control impact with the severity value from the rule,
    // default to medium (0.5) if not found.
    control.impact = severityStringToImpact(rule['@_severity'] || 'medium')

    if (!control.descs || Array.isArray(control.descs)) {
      control.descs = {}
    }

    // Update the control descriptions (descs) check with the check text from the rule,
    if (rule.check) {
      if (rule.check.some((ruleValue) => 'check-content' in ruleValue)) {
        control.descs.check = removeXMLSpecialCharacters(rule.check ? rule.check[0]['check-content'][0] : 'Missing description')
        control.tags.check_id = rule.check[0]['@_system']
      } else if (rule.check.some((ruleValue) => 'check-content-ref' in ruleValue) && ovalDefinitions) {
        let referenceID: string | null = null;
        for (const checkContent of rule.check) {
          if ('check-content-ref' in checkContent && checkContent['@_system'].includes('oval')) {
            logger.info(`Found OVAL reference: ${checkContent['@_system']}`)
            for (const checkContentRef of checkContent['check-content-ref']) {
              if (checkContentRef['@_name']) {
                referenceID = checkContentRef['@_name']
              }
            }
          }
        }
        if (referenceID && referenceID in ovalDefinitions) {
          // May need to further check if ovalDefinitions[referenceID].metadata[0].title[0] are not populated?
          control.descs.check = removeXMLSpecialCharacters(ovalDefinitions[referenceID].metadata[0].title[0])
        } else if (referenceID) {
          logger.warn(`Could not find OVAL definition for ${referenceID}`)
        }
      }
    }
    // Very CIS specific
    else if (rule['complex-check']) {
      const checkTexts: string[] = [];
            
      for (const complexChecks of rule['complex-check']) {
        const allComplexChecks = extractAllComplexChecks(complexChecks)

        if (control.id === '1.1.1.5') {
          logger.info(allComplexChecks)
        }

        allComplexChecks.forEach((complexCheck) => {
          if (complexCheck.check) {
            complexCheck.check.forEach((check) => {
              if (check['@_system']?.toString().toLowerCase().includes('oval')) {
                const ovalReference = check['check-content-ref'][0]['@_name']
                if (!ovalDefinitions) {
                  logger.warn(`Missing OVAL definitions! Unable to process OVAL reference: ${ovalReference}`)
                } else if (ovalReference && ovalReference in ovalDefinitions) {
                  ovalDefinitions[ovalReference].resolvedValues.forEach((resolvedValue: any) => {
                    const comment = resolvedValue['@_comment']
                    if (comment) {
                      checkTexts.push(comment+'\n')
                    }
                                        
                    resolvedValue.resolvedObjects.forEach((resolvedObject: any) => {
                      // Try to find the associated state for a resolved object
                      const resolvedId = resolvedObject['@_id'].split(':')[resolvedValue['@_id'].split(':').length - 1]

                      if (resolvedId) {
                        const relatedResolvedState = 
                          resolvedValue.resolvedStates.find((resolvedState: {'@_id': string}) =>
                            resolvedState['@_id'].toLowerCase().includes(resolvedId.toLowerCase())
                          )
                        if (relatedResolvedState) {
                          _.set(resolvedObject, 'expectedState', _.pickBy(relatedResolvedState, (value, key) => !key.startsWith('@_')))
                        }
                      }
                      checkTexts.push(JSON.stringify(_.pickBy(resolvedObject, (value, key) => !key.startsWith('@_')), null, 2))
                    })
                  })
                }
              } else {
                logger.warn(`Found external reference to unknown system: ${check['@_system']}, only OVAL is supported`)
              }
            })
          }
        })
      }

      if (checkTexts.length >= 1) {
        control.descs.check = checkTexts.join('\n')
      }
    }

    // Update the control descriptions (descs) fix with content from the rule
    // fixtest, if not found, defaults to "Missing fix text"
    if (_.get(rule.fixtext, '[0]["#text"]')) {
      control.descs.fix = removeXMLSpecialCharacters(rule.fixtext[0]['#text'])
    } else if (typeof rule.fixtext === 'undefined') {
      if (rule.fix && rule.fix[0]) {
        control.descs.fix = removeHtmlTags((rule.fix[0] as Notice)['#text'] || 'Missing fix text')
      }      
    } else if (typeof rule.fixtext[0] === 'string') {
      control.descs.fix = removeHtmlTags(rule.fixtext[0])
    } else if (typeof rule.fixtext[0] === 'object') {
      if (Array.isArray(rule.fixtext[0])) {
        control.descs.fix = removeHtmlTags(pretty(convertJsonIntoXML(rule.fixtext[0].map((fixtext: any) => {
          if (fixtext.div) {
            return fixtext.div
          } else {
            return fixtext
          }
        }))))
      } else {
        control.descs.fix = removeHtmlTags(removeXMLSpecialCharacters(pretty(convertJsonIntoXML(rule.fixtext)))).replace('\n',' ').trim()
      }
    } else {
      control.descs.fix = 'Missing fix text'
    }

    // Update the control tags base on corresponding rule tags.
    control.tags.severity = impactNumberToSeverityString(severityStringToImpact(rule['@_severity'] || 'medium'))
    control.tags.gid = rule.group['@_id']
    control.tags.rid = rule['@_id']
    control.tags.stig_id = rule['version']

    if (typeof rule.group.title === 'string') {
      control.tags.gtitle = removeXMLSpecialCharacters(rule.group.title)
    } else {
      const gtitle = _.get(rule.group, 'title[0].#text', 'undefined title') === 'undefined title'
        ? _.get(rule.group, 'title[0]', 'undefined title')
        : _.get(rule.group, 'title[0].#text', 'undefined title')

      control.tags.gtitle = typeof gtitle === 'string' ? gtitle : (gtitle as FrontMatter)['#text'] || 'undefined title'
    }
        
    if (rule['fix'] && rule['fix'].length > 0) {
      control.tags.fix_id = rule['fix'][0]['@_id']
    }

    if (rule['rationale']) {
      control.tags.rationale = rule['rationale'][0]['#text']
    }

    // The description tag contains the following tags as well:
    //   "FalsePositives", "FalseNegatives", "Documentable", "Mitigations",
    //   "SeverityOverrideGuidance", "PotentialImpacts", "ThirdPartyTools",
    //   "MitigationControl", "Responsibility", "IAControls"
    if (typeof extractedDescription === 'object') {
      control.tags.satisfies = 
        extractedDescription.VulnDiscussion?.includes('Satisfies: ') && extractedDescription.VulnDiscussion.split('Satisfies: ').length >= 1
          ? extractedDescription.VulnDiscussion.split('Satisfies: ')[1].split(',').map(satisfaction => satisfaction.trim())
          : undefined
      control.tags.false_negatives = extractedDescription.FalseNegatives || undefined
      control.tags.false_positives = extractedDescription.FalsePositives || undefined
      control.tags.documentable = typeof extractedDescription.Documentable === 'boolean'
        ? extractedDescription.Documentable
        : undefined
      control.tags.mitigations = extractedDescription.Mitigations || undefined
      control.tags.severity_override_guidance = extractedDescription.SeverityOverrideGuidance || undefined
      control.tags.potential_impacts = extractedDescription.PotentialImpacts || undefined
      control.tags.third_party_tools = extractedDescription.ThirdPartyTools || undefined
      control.tags.mitigation_control = extractedDescription.MitigationControl || undefined
      control.tags.mitigation_controls = extractedDescription.MitigationControls || undefined
      control.tags.responsibility = extractedDescription.Responsibility || undefined
      control.tags.ia_controls = extractedDescription.IAControls || undefined
    }

    // Ensure that tags inside the tags array are not an array
    control.tags = _.mapValues(_.omitBy(control.tags, (value) => value === undefined), (value) => {
      if (value && Array.isArray(value)) {
        if (Array.isArray(value[0])) {
          return removeXMLSpecialCharacters(value[0][0] as string)
        } else if (value.length > 1) {
          return value
        } else {
          return removeXMLSpecialCharacters(value[0] as string)
        }
      } else if (typeof value === 'string') {
        return removeXMLSpecialCharacters(value)
      } else {
        return value
      }
    })
  
    // Get all identifiers from the rule; cci, nist, and legacy
    if (rule.ident) {
      rule.ident.forEach((identifier) => {
        // Get CCIs
        if (identifier['@_system'][0].toLowerCase().includes('cci')) {
          if (!('cci' in control.tags)) {
            control.tags.cci = []
          }
          control.tags.cci?.push(identifier['#text'])
        }
        // Get legacy identifiers
        else if (identifier['@_system'][0].toLowerCase().includes('legacy')) {
          if (!('legacy' in control.tags)) {
            control.tags.legacy = []
          }
          control.tags.legacy?.push(identifier['#text'])
        }
        // Get NIST identifiers
        else if (identifier['@_system'].toString().toLowerCase().includes('nist')) {
          if (!('nist' in control.tags)) {
            control.tags.nist = []
          }
          control.tags.nist?.push(identifier['#text'])
        }
      })
    }

    // Update control references with content from the benchmark rule object
    rule.reference?.forEach((reference) => {
      if (_.get(reference, '@_href') === '') {
        control.refs?.push(_.get(reference, '#text', 'undefined href'))
      } else {
        try {
          const referenceText = _.get(reference, '#text') || ''
          const referenceURL = _.get(reference, '@_href') || ''
          if (referenceURL) {
            const parsedURL = new URL(_.get(reference, '@_href', 'undefined href'))
            if (parsedURL.protocol.toLowerCase().includes('http') || parsedURL.protocol.toLowerCase().includes('https')) {
              control.refs?.push({
                ref: referenceText,
                url: referenceURL
              })
            } else {
              control.refs?.push({
                ref: referenceText,
                uri: referenceURL
              })
            }
          } else {
            if ('title' in reference) {
              const title = _.get(reference, 'title')
              if (Array.isArray(title)) {
                control.refs?.push(title[0])
              } else {
                control.refs?.push(_.get(reference, 'title') as string)
              }
            }
          }
          // Add the reference to the control tags when separated by §
          if (typeof referenceText === 'string' && referenceText.indexOf('§') !== -1) {
            const referenceParts = referenceText.split('§')
            if (referenceParts.length == 2) {
              // eslint-disable-next-line  prefer-const
              let [identifierType, identifier] = referenceText.split('§')
              identifierType = identifierType.toLowerCase();
              if (!(identifierType in control.tags)) {
                control.tags[identifierType] = [identifier]
              } else if (Array.isArray(control.tags[identifierType])) {
                control.tags[identifierType] = _.union(control.tags[identifierType] as ArrayLike<string>, [identifier])
              } else {
                logger.warn(`Attempted to push identifier to control tags when identifier already exists: ${identifierType}: ${identifier}`)
              }
            } else {
              logger.warn('Reference parts of invalid length: ', referenceParts)
            }
          }
        } catch (e) {
          logger.warn(`Error parsing ref for control ${control.id}: `)
          logger.warn(JSON.stringify(reference, null, 2))
          logger.warn(e);
        }
      }
    })

    // Associate any CCIs with NIST tags
    if (control.tags.cci) {
      control.tags.cci.forEach((cci: string) => {
        if (!('nist' in control.tags)) {
          control.tags.nist = []
        }
        if (cci in CciNistMappingData) {
          control.tags.nist?.push(_.get(CciNistMappingData, cci))
        }
      })
    }

    profile.controls.push(control)
  })

  profile.controls = _.sortBy(profile.controls, 'id')

  return profile.toUnformattedObject()
}
