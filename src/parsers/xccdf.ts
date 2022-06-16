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
        let extractedDescription;
        if (Array.isArray(rule.description)) {
            extractedDescription = rule.description[0]['#text']
        } else {
            extractedDescription = convertEncodedHTMLIntoJson(rule.description)
        }
        const control = new Control();

        control.id = rule.group['@_id']
        control.title = rule['@_severity'] ? rule.title : `[[[MISSING SEVERITY FROM STIG]]] ${rule.title}`
        control.desc = typeof extractedDescription === 'string' ? extractedDescription :  extractedDescription.VulnDiscussion.split('Satisfies: ')[0]
        control.impact = severityStringToImpact(rule['@_severity'] || 'critical', rule.group['@_id'])
        if (!control.descs || Array.isArray(control.descs)) {
            control.descs = {}
        }
        console.log(rule.check)
        control.descs.check = rule.check ? rule.check[0]['check-content'] : 'Missing description'
        control.descs.fix = rule.fixtext ? rule.fixtext[0]['#text'] : (rule.fix ? (rule.fix[0] as Notice)['#text'] || 'Missing fix text' : 'Missing fix text')
        new Control({
    //         tags: _.omitBy({
    //             severity: impactNumberToSeverityString(severityStringToImpact(group.Rule['@_severity'] || 'critical')),
    //             gtitle: group.title,
    //             satisfies: extractedDescription.VulnDiscussion?.includes('Satisfies: ') && extractedDescription.VulnDiscussion.split('Satisfies: ').length >= 1 ? extractedDescription.VulnDiscussion.split('Satisfies: ')[1].split(',').map(satisfaction => satisfaction.trim()) : undefined,
    //             gid: group['@_id'],
    //             rid: group.Rule['@_id'],
    //             stig_id: group.Rule.version,
    //             fix_id: group.Rule.fix['@_id'],
    //             false_negatives: extractedDescription.FalseNegatives,
    //             false_positives: extractedDescription.FalsePositives,
    //             documentable: extractedDescription.Documentable,
    //             mitigations: extractedDescription.Mitigations,
    //             severity_override_guidance: extractedDescription.SeverityOverrideGuidance,
    //             potential_impacts: extractedDescription.PotentialImpacts,
    //             third_party_tools: extractedDescription.ThirdPartyTools,
    //             mitigation_control: extractedDescription.MitigationControl, // This exists as mitigation_controls in inspec_tools, but is called mitigation_control in the xccdf, this shouldn't ever be defined but is still here for backwards compatibility
    //             mitigation_controls: extractedDescription.MitigationControls,
    //             responsibility: extractedDescription.Responsibility,
    //             ia_controls: extractedDescription.IAControls
    //         }, i => !Boolean(i))
        })

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