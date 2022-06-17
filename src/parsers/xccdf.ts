import {data as CCINistMappings} from '@mitre/hdf-converters/lib/src/mappings/CciNistMappingData'
import Profile from '../objects/profile';
import { convertEncodedHTMLIntoJson, convertEncodedXmlIntoJson, impactNumberToSeverityString, severityStringToImpact } from '../utilities/xccdf';
import { BenchmarkGroup, BenchmarkRule, DecodedDescription, FrontMatter, Notice, ParsedXCCDF, RationaleElement } from '../types/xccdf';
import Control from '../objects/control';
import _ from 'lodash';
import { getFirstPath } from '../utilities/global';
import { OvalDefinitionValue } from '../types/oval';

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

export function processXCCDF(xml: string, ovalDefinitions?: Record<string, OvalDefinitionValue>): Profile {
    const parsedXML: ParsedXCCDF = convertEncodedXmlIntoJson(xml)
    const rules = extractAllRules(parsedXML.Benchmark[0].Group)

    console.log(parsedXML.Benchmark[0]['@_id'])

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

        control.id = rule.group['@_id']
        control.title = rule['@_severity'] ? rule.title : `[[[MISSING SEVERITY FROM STIG]]] ${rule.title}`
        control.desc = typeof extractedDescription === 'string' ? extractedDescription :  extractedDescription.VulnDiscussion?.split('Satisfies: ')[0]
        control.impact = severityStringToImpact(rule['@_severity'] || 'critical', rule.group['@_id'])
        if (!control.descs || Array.isArray(control.descs)) {
            control.descs = {}
        }
        control.descs.check = rule.check ? rule.check[0]['check-content'] : 'Missing description'
        control.descs.fix = rule.fixtext ? rule.fixtext[0]['#text'] : (rule.fix ? (rule.fix[0] as Notice)['#text'] || 'Missing fix text' : 'Missing fix text')
        control.tags.severity = impactNumberToSeverityString(severityStringToImpact(rule['@_severity'] || 'critical', control.id))
        control.tags.gtitle = _.get(rule.group, 'title[0].#text')
        control.tags.gid = rule.group['@_id'],
        control.tags.rid = rule['@_id']
        control.tags.stig_id = rule['version']
        
        if (rule['fix'] && rule['fix'].length > 0) {
            control.tags.fix_id = rule['fix'][0]['@_id']
            console.log(control.tags.fix_id)
        }

        

        if (typeof extractedDescription === 'object') {
            control.tags.satisfies = extractedDescription.VulnDiscussion?.includes('Satisfies: ') && extractedDescription.VulnDiscussion.split('Satisfies: ').length >= 1 ? extractedDescription.VulnDiscussion.split('Satisfies: ')[1].split(',').map(satisfaction => satisfaction.trim()) : undefined
            control.tags.false_negatives = extractedDescription.FalseNegatives
            control.tags.false_positives = extractedDescription.FalsePositives
            control.tags.documentable = extractedDescription.Documentable
            control.tags.mitigations = extractedDescription.Mitigations
            control.tags.severity_override_guidance = extractedDescription.SeverityOverrideGuidance
            control.tags.potential_impacts = extractedDescription.PotentialImpacts
            control.tags.third_party_tools = extractedDescription.ThirdPartyTools
            control.tags.mitigation_control = extractedDescription.MitigationControl
            control.tags.mitigation_controls = extractedDescription.MitigationControls
            control.tags.responsibility = extractedDescription.Responsibility
            control.tags.ia_controls = extractedDescription.IAControls
        }

    //     if ('ident' in group.Rule) {
    //         const identifiers = Array.isArray(group.Rule.ident) ? group.Rule.ident : [group.Rule.ident]
    //         // Grab CCI/NIST/Legacy identifiers
    //         identifiers.forEach(identifier => {
    //           const identifierText = identifier['#text']
    //           if (identifier['@_system'].toLowerCase().endsWith('cci')) {
    //             control.tags.cci?.push(identifierText)
    //             if (identifierText in CCINistMappings) {
    //               control.tags.nist?.push(_.get(CCINistMappings, identifierText))
    //             }
    //           }
    //           if (identifier['@_system'].toLowerCase().endsWith('legacy')) {
    //             control.tags.legacy?.push(identifierText)
    //           } 
    //         })
    //       }

    //     profile.controls.push(control)
    })

    // profile.controls = _.sortBy(profile.controls, 'id')

    return profile.toUnformattedObject()
}