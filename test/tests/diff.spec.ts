import fs from 'fs'
import {diffProfile, processXCCDF} from "../../src/index"
import { createWinstonLogger } from '../../src/utilities/logging'
import { processJSON } from '../../src/parsers/json'
import { ProfileDiff } from '../../src/types/diff'
import { convertJsonIntoXML } from '../../src/utilities/xccdf'

describe('The diff utils', () => {
    it('Successfully finds the difference between RHEL 8 V1R2 XCCDF and V1R3 XCCDF', () => {
        const V1R2 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R2_Manual-xccdf.xml`, 'utf-8'), false, 'group')
        const V1R3 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R3_Manual-xccdf.xml`, 'utf-8'), false, 'group')

        fs.writeFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', JSON.stringify(diffProfile(V1R2, V1R3, createWinstonLogger()), null, 2))

        const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', 'utf-8'))

        // expect(diffProfile(V1R2, V1R3)).toEqual(expected)
    })

    it('Successfully finds the difference between a RHEL 7 V2R6 InSpec Profile and V2R7 XCCDF', () => {
        const V2R6 = processJSON(fs.readFileSync('test/sample_data/inspec/json/RHEL7-V2R6-Profile.json', 'utf-8'))
        const V2R7 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_7_STIG_V2R7_Manual-xccdf.xml`, 'utf-8'), false, 'group')

        fs.writeFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', JSON.stringify(diffProfile(V2R6, V2R7, createWinstonLogger()), null, 2))

        const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', 'utf-8'))

    })

    it('Test only 2 controls - one control has updated check text and one has no chanegs - find the difference between a RHEL 7 V3R7 InSpec Profile and V3R8 XCCDF', () => {
        const V3R7 = processJSON(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r7-only-2-controls-profile.json', 'utf-8'))
        const V3R8 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/rhel-7-v3r8-only-2-controls-sample-xxcdf.xml`, 'utf-8'), false, 'rule')

        fs.writeFileSync('test/sample_data/diffs/RHEL7_V3R7_V3R8.json', JSON.stringify(diffProfile(V3R7, V3R8, createWinstonLogger()), null, 2))

        // const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL7_V3R7_V3R8.json', 'utf-8'))

        const profileDiff = diffProfile(V3R7, V3R8, createWinstonLogger());

        // expect(diffProfile(V3R7, V3R8, createWinstonLogger())).toEqual(expected);

        expect(profileDiff.originalDiff.changedControlIDs).toEqual(["SV-251703"]);
    })

    // Test nested rules in one group
})