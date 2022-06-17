import fs from 'fs'
import {diffProfile, processXCCDF} from "../../src/index"
import { processJSON } from '../../src/parsers/json'

describe('The diff utils', () => {
    it('Successfully finds the difference between RHEL 8 V1R2 XCCDF and V1R3 XCCDF', () => {
        const V1R2 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R2_Manual-xccdf.xml`, 'utf-8'))
        const V1R3 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R3_Manual-xccdf.xml`, 'utf-8'))

        // fs.writeFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', JSON.stringify(diffProfile(V1R2, V1R3), null, 2))

        const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', 'utf-8'))

        expect(diffProfile(V1R2, V1R3)).toEqual(expected)
    })

    it('Successfully finds the difference between a RHEL 8 V2R6 InSpec Profile and V2R7 XCCDF', () => {
        const V2R6 = processJSON(fs.readFileSync('test/sample_data/inspec/json/RHEL7-V2R6-Profile.json', 'utf-8'))
        const V2R7 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_7_STIG_V2R7_Manual-xccdf.xml`, 'utf-8'))

        // fs.writeFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', JSON.stringify(diffProfile(V2R6, V2R7), null, 2))

        const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', 'utf-8'))

        expect(diffProfile(V2R6, V2R7)).toEqual(expected)
    })

    it('Successfully finds the difference between a Ubuntu 18.04 InSpec Profile and Ubuntu 20.04 CIS Benchmark', () => {
        const ubuntu1804 = processJSON(fs.readFileSync('test/sample_data/inspec/json/Ubuntu-18.04-Profile.json', 'utf-8'))
        const ubuntu2004 = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/Canonical_Ubuntu_20.04-xccdf.xml', 'utf-8'))

        fs.writeFileSync('test/sample_data/diffs/Ubuntu_1804_2004.json', JSON.stringify(diffProfile(ubuntu1804, ubuntu2004), null, 2))
    })
})