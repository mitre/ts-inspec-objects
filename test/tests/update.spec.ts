import { processJSON } from "../../src"
import { updateProfileUsingXCCDF } from "../../src/utilities/update"
import fs from 'fs'

describe('The update utils', () => {
    it('Successfully updates RHEL 8 V2R6 to V2R7', () => {
        const V2R6 = processJSON(fs.readFileSync('test/sample_data/inspec/json/RHEL7-V2R6-Profile.json', 'utf-8'))
        fs.writeFileSync('test/sample_data/profile-objects/RHEL7-V2R6-Profile.json', JSON.stringify(V2R6, null, 2))
        
        const updatedProfile = updateProfileUsingXCCDF(V2R6, fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_7_STIG_V2R7_Manual-xccdf.xml`, 'utf-8'), 'group')
        fs.writeFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', JSON.stringify(updatedProfile.diff, null, 2))
        fs.writeFileSync('test/sample_data/markdown/RHEL7-V2R7-Profile.md', updatedProfile.markdown)
        fs.writeFileSync('test/sample_data/updates/RHEL7_V2R6_V2R7.json', JSON.stringify(updatedProfile.profile, null, 2))
    })
})