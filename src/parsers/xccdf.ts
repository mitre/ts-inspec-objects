import {default as CCINistMappings} from '@mitre/hdf-converters/lib/data/cci-nist-mapping.json'
import Profile from '../objects/profile';
import { convertEncodedHTMLIntoJson, convertEncodedXmlIntoJson, impactNumberToSeverityString, severityStringToImpact } from '../utilities/xccdf';
import { DecodedDescription, DisaStig } from '../types/xccdf';
import Control from '../objects/control';
import _ from 'lodash';

export function processXCCDF(xml: string): Profile {
    const parsedXML: DisaStig = convertEncodedXmlIntoJson(xml)
    const groups = parsedXML.Benchmark.Group;

    const profile = new Profile({
        name: parsedXML.Benchmark['@_id'],
        title: parsedXML.Benchmark.title,
        summary: parsedXML.Benchmark.description
    });

    groups.forEach(group => {
        const extractedDescription: DecodedDescription = convertEncodedHTMLIntoJson(group.Rule?.description)
        const control = new Control({
            id: group['@_id'],
            title: group.Rule['@_severity'] ? group.Rule.title : `[[[MISSING SEVERITY FROM STIG]]] ${group.Rule.title}`,
            desc: extractedDescription.VulnDiscussion?.split('Satisfies: ')[0],
            impact: severityStringToImpact(group.Rule['@_severity'] || 'critical'),
            rationale: '',
            descs: {
                check: group.Rule.check['check-content'],
                fix: group.Rule.fixtext['#text'],
            },
            tags: {
                severity: impactNumberToSeverityString(severityStringToImpact(group.Rule['@_severity'] || 'critical')),
                gtitle: group.title,
                satisfies: extractedDescription.VulnDiscussion?.includes('Satisfies: ') && extractedDescription.VulnDiscussion.split('Satisfies: ').length >= 1 ? extractedDescription.VulnDiscussion.split('Satisfies: ')[1].split(',').map(satisfaction => satisfaction.trim()) : undefined,
                gid: group['@_id'],
                rid: group.Rule['@_id'],
                stig_id: group.Rule.version,
                fix_id: group.Rule.fix['@_id'],
                false_negatives: extractedDescription.FalseNegatives,
                false_positives: extractedDescription.FalsePositives,
                documentable: extractedDescription.Documentable,
                mitigations: extractedDescription.Mitigations,
                severity_override_guidance: extractedDescription.SeverityOverrideGuidance,
                potential_impacts: extractedDescription.PotentialImpacts,
                third_party_tools: extractedDescription.ThirdPartyTools,
                mitigation_control: extractedDescription.MitigationControl, // This exists as mitigation_controls in inspec_tools, but is called mitigation_control in the xccdf, this shouldn't ever be defined but is still here for backwards compatibility
                mitigation_controls: extractedDescription.MitigationControls,
                responsibility: extractedDescription.Responsibility,
                ia_controls: extractedDescription.IAControls
            }
        })

        if ('ident' in group.Rule) {
            const identifiers = Array.isArray(group.Rule.ident) ? group.Rule.ident : [group.Rule.ident]
            // Grab CCI/NIST/Legacy identifiers
            identifiers.forEach(identifier => {
              const identifierText = identifier['#text']
              if (identifier['@_system'].toLowerCase().endsWith('cci')) {
                control.tags.cci?.push(identifierText)
                if (identifierText in CCINistMappings) {
                  control.tags.nist?.push(_.get(CCINistMappings, identifierText))
                }
              }
              if (identifier['@_system'].toLowerCase().endsWith('legacy')) {
                control.tags.legacy?.push(identifierText)
              } 
            })
          }

        profile.controls.push(control)
    })

    return profile
}