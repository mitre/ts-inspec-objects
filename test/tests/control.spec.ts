import { processInSpecProfile } from "../../src"
import { updateProfileUsingXCCDF } from "../../src/utilities/update"
import { createWinstonLogger } from "../../src/utilities/logging"
import fs from 'fs'
import path from 'path'

describe('The control functionality', () => {
    const V3R6 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r6-mini-profile.json', 'utf-8'))
    const V3R7 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r7-mini-sample-profile.json', 'utf-8'))

    // fs.writeFileSync('test/sample_data/profile-objects/RHEL7-V2R6-Profile.json', JSON.stringify(V3R6, null, 2))
    // V3R6.controls.forEach(control => {
    //     // Write the new control to the controls folder
    //     fs.writeFileSync(path.join('test/sample_data/', 'controls-base', `${control.id}.rb`), control.toRuby())
    // })

    V3R7.controls.forEach(control => {
        // Write the new control to the controls folder
        fs.writeFileSync(path.join('test/sample_data/', 'controls-base', `${control.id}.rb`), control.toRuby())
    })
    
    // const updatedProfile = updateProfileUsingXCCDF(V3R6, fs.readFileSync(`test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml`, 'utf-8'), 'rule', createWinstonLogger())

    const updatedProfile = updateProfileUsingXCCDF(V3R7, fs.readFileSync(`test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml`, 'utf-8'), 'rule', createWinstonLogger())


    fs.writeFileSync('test/sample_data/markdown/RHEL7-V3R8-Profile.md', updatedProfile.markdown)
    fs.writeFileSync('test/sample_data/updates/RHEL7_V3R7_V3R8.json', JSON.stringify(updatedProfile.profile, null, 2))

    updatedProfile.profile.controls.forEach(control => {
        // Write the new control to the controls folder
        fs.writeFileSync(path.join('test/sample_data/', 'controls-updated', `${control.id}.rb`), control.toRuby())
    })
    

    it('should correctly write the control structure to ruby that has no changes', () => {
        expect(fs.readFileSync('test/sample_data/controls-updated/SV-204392.rb', 'utf-8')).toEqual(fs.readFileSync('test/sample_data/controls-base/SV-204392.rb', 'utf-8'));
    })

    it('should correctly write the control structure to ruby that has some changes', () => {
        expect(fs.readFileSync('test/sample_data/controls-updated/SV-251703.rb', 'utf-8')).toEqual(fs.readFileSync('test/sample_data/controls-base/SV-251703.rb', 'utf-8'));
    })
})