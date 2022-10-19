import fs from 'fs'
import {diffProfile, processXCCDF} from "../../src/index"
import { createWinstonLogger } from '../../src/utilities/logging'
import { processJSON } from '../../src/parsers/json'
import { ProfileDiff } from '../../src/types/diff'
import { convertJsonIntoXML } from '../../src/utilities/xccdf'
import _ from "lodash"

// const V1R2 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R2_Manual-xccdf.xml`, 'utf-8'), false, 'group')
// const V1R3 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R3_Manual-xccdf.xml`, 'utf-8'), false, 'group')

// const V2R6 = processJSON(fs.readFileSync('test/sample_data/inspec/json/RHEL7-V2R6-Profile.json', 'utf-8'))
// const V2R7 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_7_STIG_V2R7_Manual-xccdf.xml`, 'utf-8'), false, 'group')

const V3R7 = processJSON(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r7-mini-sample-profile.json', 'utf-8'))
const V3R8 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml`, 'utf-8'), false, 'rule')

// describe('The diff utils', () => {
//     it('Successfully finds the difference between RHEL 8 V1R2 XCCDF and V1R3 XCCDF', () => {

//         fs.writeFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', JSON.stringify(diffProfile(V1R2, V1R3, createWinstonLogger()), null, 2))

//         const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', 'utf-8'))

//         // expect(diffProfile(V1R2, V1R3)).toEqual(expected)
//     })

//     it('Successfully finds the difference between a RHEL 7 V2R6 InSpec Profile and V2R7 XCCDF', () => {

//         fs.writeFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', JSON.stringify(diffProfile(V2R6, V2R7, createWinstonLogger()), null, 2))

//         const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', 'utf-8'))

//     })
// })

describe('The diff utils', () => {

    fs.writeFileSync('test/sample_data/diffs/RHEL7_V3R7_V3R8.json', JSON.stringify(diffProfile(V3R7, V3R8, createWinstonLogger()), null, 2))
    const profileDiff = diffProfile(V3R7, V3R8, createWinstonLogger());

    it('should correctly identify added controls', () => {
        expect(profileDiff.rawDiff.addedControlIDs).toEqual(["SV-204394"]);
    })
    it('should correctly identify removed controls', () => {
        expect(profileDiff.rawDiff.removedControlIDs).toEqual(["SV-204474"]);
    })
    it('should correctly identify renamed controls', () => {
        expect(profileDiff.rawDiff.renamedControlIDs).toEqual({"V-73165": "SV-204565"});
    })
    it('should correctly identify changes in existing controls', () => {
        // we know that the description in the sample's SV-251703 changed
        expect(_.get(profileDiff, "rawDiff.changedControls.[\"SV-251703\"].descs.check")).toBeTruthy();
    })
    it('should ignore whitespace for ignoreFormattedDiff, but consider whitespace changes for rawDiff', () => {
        // this particular control ONLY had a few newlines change in its description
        // ignoreFormattingDiff should ignore this, but rawDiff should not
        expect(_.get(profileDiff, "ignoreFormattingDiff.changedControls.[\"SV-204392\"].descs.check")).toBeFalsy();
        expect(_.get(profileDiff, "rawDiff.changedControls.[\"SV-204392\"].descs.check")).toBeTruthy();
    })
    // Test nested rules in one group
})