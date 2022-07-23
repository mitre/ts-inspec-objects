import Profile from '../objects/profile';
import { convertEncodedHTMLIntoJson, convertEncodedXmlIntoJson, impactNumberToSeverityString, removeXMLSpecialCharacters, severityStringToImpact } from '../utilities/xccdf';
import { BenchmarkGroup, BenchmarkRule, DecodedDescription, FrontMatter, Notice, ParsedXCCDF, RationaleElement } from '../types/xccdf';
import Control from '../objects/control';
import _ from 'lodash';
import { OvalDefinitionValue } from '../types/oval';
import {data as CciNistMappingData} from '../mappings/CciNistMappingData'

export type GroupContextualizedRule = BenchmarkRule & {group: Omit<BenchmarkGroup, 'Rule' | 'Group'>}

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

function ensureDecodedXMLStringValue(input: string | {'#text': string, '@_lang': string}[]): string {
    return _.get(input, '[0].#text') ? _.get(input, '[0].#text') : input
}

export function processXCCDF(xml: string, removeNewlines = false, useRuleId: 'group' | 'rule' | 'version' | 'cis', ovalDefinitions?: Record<string, OvalDefinitionValue>): Profile {
    const parsedXML: ParsedXCCDF = convertEncodedXmlIntoJson(xml)
    const rules = extractAllRules(parsedXML.Benchmark[0].Group)

    const profile = new Profile({
        name: parsedXML.Benchmark[0]['@_id'],
        title: (parsedXML.Benchmark[0].title[0] as FrontMatter)['#text'],
        summary: (parsedXML.Benchmark[0].description[0] as RationaleElement)['#text']
    });

    rules.forEach(rule => {
        let extractedDescription: string | DecodedDescription;
        if (Array.isArray(rule.description)) {
            extractedDescription = rule.description[0]['#text']
        } else {
            extractedDescription = convertEncodedHTMLIntoJson(rule.description)
        }
        
        const control = new Control();


        switch (useRuleId) {
            case 'group':
                control.id = rule.group['@_id']
                break;
            case 'rule':
                if (rule['@_id'].toLowerCase().startsWith('sv')) {
                    control.id = rule['@_id'].split('r')[0]
                } else {
                    control.id = rule['@_id']
                }
                break;
            case 'version':
                control.id = rule.version
                break;
            case 'cis':
                const controlIdRegex = /\d(\d?)(\d?)(\d?)(.\d(\d?)(\d?)(\d?))?(.\d(\d?)(\d?)(\d?))?(.\d(\d?)(\d?)(\d?))?(.\d(\d?)(\d?)(\d?))?/g
                const controlIdMatch = controlIdRegex.exec(rule['@_id'])

                if (controlIdMatch) {
                    control.id = controlIdMatch[0]
                } else {
                    throw new Error(`Could not parse control ID from rule ID: ${rule['@_id']}. Expecting format: 'xccdf_org.cisecurity.benchmarks_rule_1.1.11_Rule_title_summary`)
                }
                break;
            default:
                throw new Error('useRuleId must be one of "group", "rule", or "version"')
        }
        
        control.title = removeXMLSpecialCharacters(rule['@_severity'] ? ensureDecodedXMLStringValue(rule.title) : `[[[MISSING SEVERITY FROM STIG]]] ${ensureDecodedXMLStringValue(rule.title)}`)
        
        const descriptionText = (typeof extractedDescription === 'object' && !Array.isArray(extractedDescription)) ? extractedDescription.VulnDiscussion?.split('Satisfies: ')[0] || 'Missing Description' : ''
        control.desc = removeXMLSpecialCharacters(descriptionText)

        control.impact = severityStringToImpact(rule['@_severity'] || 'medium', rule.group['@_id'])
        
        if (!control.descs || Array.isArray(control.descs)) {
            control.descs = {}
        }

        if (rule.check) {
            if (rule.check.some((ruleValue) => 'check-content' in ruleValue)) {
                control.descs.check = removeXMLSpecialCharacters(rule.check ? rule.check[0]['check-content'] : 'Missing description')
                control.tags.check_id = rule.check[0]['@_system']
                
            } else if (rule.check.some((ruleValue) => 'check-content-ref' in ruleValue) && ovalDefinitions) {
                let referenceID: string | null = null;
                for (const checkContent of rule.check) {
                    if ('check-content-ref' in checkContent && checkContent['@_system'].includes('oval')) {
                        for (const checkContentRef of checkContent['check-content-ref']) {
                            if (checkContentRef['@_name']) {
                                referenceID = checkContentRef['@_name']
                            }
                        }
                    }
                }
                if (referenceID && referenceID in ovalDefinitions) {
                    control.descs.check = removeXMLSpecialCharacters(ovalDefinitions[referenceID].metadata[0].title)
                } else if (referenceID) {
                    console.warn(`Could not find OVAL definition for ${referenceID}`)
                }
            }
        }

        if (_.get(rule.fixtext, '[0]["#text"]')) {
            control.descs.fix = removeXMLSpecialCharacters(rule.fixtext[0]['#text'])
        } else if (typeof rule.fixtext === 'string') {
            control.descs.fix = removeXMLSpecialCharacters(rule.fixtext)
        } else if (typeof rule.fixtext === 'object') {
            if (Array.isArray(rule.fixtext)) {
                control.descs.fix = removeXMLSpecialCharacters(JSON.stringify(rule.fixtext))
            }
        } else if (typeof rule.fixtext === 'undefined') {
            if (rule.fix && rule.fix[0]) {
                control.descs.fix = removeXMLSpecialCharacters((rule.fix[0] as Notice)['#text'] || 'Missing fix text')
            }
        } else {
            control.descs.fix = 'Missing fix text'
        }
    
        
        control.tags.severity = impactNumberToSeverityString(severityStringToImpact(rule['@_severity'] || 'critical', control.id || 'Unknown'))
        control.tags.gid = rule.group['@_id'],
        control.tags.rid = rule['@_id']
        control.tags.stig_id = rule['version']


        if (typeof rule.group.title === "string") {
            control.tags.gtitle = removeXMLSpecialCharacters(rule.group.title)
        } else {
            control.tags.gtitle = removeXMLSpecialCharacters(_.get(rule.group, 'title[0].#text'))
        }
        
        if (rule['fix'] && rule['fix'].length > 0) {
            control.tags.fix_id = rule['fix'][0]['@_id']
        } 

        if (rule['rationale']) {
            control.tags.rationale = rule['rationale'][0]['#text']
        }

        if (typeof extractedDescription === 'object') {
            control.tags.satisfies = extractedDescription.VulnDiscussion?.includes('Satisfies: ') && extractedDescription.VulnDiscussion.split('Satisfies: ').length >= 1 ? extractedDescription.VulnDiscussion.split('Satisfies: ')[1].split(',').map(satisfaction => satisfaction.trim()) : undefined
            control.tags.false_negatives = extractedDescription.FalseNegatives || undefined
            control.tags.false_positives = extractedDescription.FalsePositives || undefined
            control.tags.documentable = typeof extractedDescription.Documentable === 'boolean' ? extractedDescription.Documentable : undefined
            control.tags.mitigations = extractedDescription.Mitigations || undefined
            control.tags.severity_override_guidance = extractedDescription.SeverityOverrideGuidance || undefined
            control.tags.potential_impacts = extractedDescription.PotentialImpacts || undefined
            control.tags.third_party_tools = extractedDescription.ThirdPartyTools || undefined
            control.tags.mitigation_control = extractedDescription.MitigationControl || undefined
            control.tags.mitigation_controls = extractedDescription.MitigationControls || undefined
            control.tags.responsibility = extractedDescription.Responsibility || undefined
            control.tags.ia_controls = extractedDescription.IAControls || undefined
        }

        control.tags = _.mapValues(_.omitBy(control.tags, (value) => value === undefined), (value) => {
            if (typeof value === 'string') {
                return removeXMLSpecialCharacters(value)
            } else {
                return value
            }
        })

         // Get all identifiers from the rule
         if (rule.ident) {
            rule.ident.forEach((identifier) => {
                // Get CCIs
                if (identifier['@_system'].toLowerCase().includes('cci')) {
                    if (!('cci' in control.tags)) {
                        control.tags.cci = []
                    }
                    control.tags.cci?.push(identifier['#text'])
                }
                // Get legacy identifiers
                else if (identifier['@_system'].toLowerCase().includes('legacy')) {
                    if (!('legacy' in control.tags)) {
                        control.tags.legacy = []
                    }
                    control.tags.legacy?.push(identifier['#text'])
                }
                // Get NIST identifiers
                else if (identifier['@_system'].toLowerCase().includes('nist')) {
                    if (!('nist' in control.tags)) {
                        control.tags.nist = []
                    }
                    control.tags.nist?.push(identifier['#text'])
                }
            })
        }

        rule.reference?.forEach((reference) => {
            if (_.get(reference, '@_href') === '') {
                control.refs?.push(_.get(reference, '#text'))
            } else {
                try {
                    const referenceText = _.get(reference, '#text') || ''
                    const referenceURL = _.get(reference, '@_href') || ''
                    if (referenceURL) {
                        const parsedURL = new URL(_.get(reference, '@_href'))
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
                            control.refs?.push(_.get(reference, 'title') as string)
                        }
                    }

                    // Add the reference to the control tags when separated by §
                    if (typeof referenceText === 'string' && referenceText.indexOf('§') !== -1) {
                        const referenceParts = referenceText.split('§')
                        if (referenceParts.length == 2) {
                            let [identifierType, identifier] = referenceText.split('§')
                            identifierType = identifierType.toLowerCase();
                            if (!(identifierType in control.tags)) {
                                control.tags[identifierType] = [identifier]
                            } else if (Array.isArray(control.tags[identifierType])) {
                                control.tags[identifierType] = _.union(control.tags[identifierType] as ArrayLike<string>, [identifier])
                            } else {
                                console.warn(`Attempted to push identifier to control tags when identifier already exists: ${identifierType}: ${identifier}`)
                            }
                        } else {
                            console.warn("Reference parts of invalid length:")
                            console.log(referenceParts)
                        }
                    }
                } catch (e){
                    console.warn(`Error parsing ref for control ${control.id}: `)
                    console.warn(JSON.stringify(reference, null, 2))
                    console.warn(e);
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