import { processInSpecProfile, processXCCDF } from "../../src"
import { updateProfileUsingXCCDF } from "../../src/utilities/update"
import { createWinstonLogger } from "../../src/utilities/logging"
import fs from 'fs'

// describe('The update utils', () => {
//     it.only('Successfully updates RHEL 8 V2R6 to V2R7', () => {
//         const V2R6 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/RHEL7-V2R6-Profile.json', 'utf-8'))
//         fs.writeFileSync('test/sample_data/profile-objects/RHEL7-V2R6-Profile.json', JSON.stringify(V2R6, null, 2))
        
//         const updatedProfile = updateProfileUsingXCCDF(V2R6, fs.readFileSync(`test/sample_data/xccdf/input/STIG/U_RHEL_7_STIG_V2R7_Manual-xccdf.xml`, 'utf-8'), 'group', createWinstonLogger())
//         fs.writeFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', JSON.stringify(updatedProfile.diff, null, 2))
//         fs.writeFileSync('test/sample_data/markdown/RHEL7-V2R7-Profile.md', updatedProfile.markdown)
//         fs.writeFileSync('test/sample_data/updates/RHEL7_V2R6_V2R7.json', JSON.stringify(updatedProfile.profile, null, 2))
//     })
// })

// describe('The update utils for describe blocks', () => {
//     const sampleControl = fs.readFileSync('test/sample_data/controls/SV-20392', 'utf-8');

//     it('should find the describe block for a control with %q in the fix text', () => {
//         const describeBlockString = getExistingDescribeFromControl(sampleControl);
//         expect(describeBlockString.toEqual(ruby_describe_block));
//     })
// })

describe('The update utils', () => {

    // this string represents what the actual ruby code is in the mini profile
    // (that is, everything that is NOT part of a reserved tag or desc like
    // the title, check, fix text etc.)
    const ruby_describe_block = "  if input('disable_slow_controls')\n    describe \"This control consistently takes a long time to run and has been disabled\n    using the disable_slow_controls attribute.\" do\n      skip \"This control consistently takes a long time to run and has been disabled\n            using the disable_slow_controls attribute. You must enable this control for a\n            full accredidation for production.\"\n    end\n  else\n\n    allowlist = input('rpm_verify_perms_except')\n\n    misconfigured_packages = command('rpm -Va').stdout.split(\"\\n\")\n      .select{ |package| package[0..7].match(/M|U|G/) }\n      .map{ |package| package.match(/\\S+$/)[0] }\n\n    unless misconfigured_packages.empty?\n      describe \"The list of rpm packages with permissions changed from the vendor values\" do\n        fail_msg = \"Files that have been modified from vendor-approved permissions but are not in the allowlist: #{(misconfigured_packages - allowlist).join(', ')}\"\n        it \"should all appear in the allowlist\" do\n          expect(misconfigured_packages).to all( be_in allowlist ), fail_msg\n        end\n      end\n    else\n      describe \"The list of rpm packages with permissions changed from the vendor values\" do\n        subject { misconfigured_packages }\n        it { should be_empty }\n      end\n    end\n  end\n"

    it('should correctly set describe blocks when ruby specific syntax (%q{}) is used in check text', () => {
        const V3R6 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r6-mini-profile.json', 'utf-8'))
        const updatedProfile = updateProfileUsingXCCDF(V3R6, fs.readFileSync(`test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml`, 'utf-8'), 'rule', createWinstonLogger())
        expect(updatedProfile.profile.controls[3].describe).toEqual(ruby_describe_block);
    })
    it('should correctly set describe blocks when ruby specific syntax (%<>) is used in check text', () => {
        const V3R6PercentString = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r6-mini-profile-with-percent-strings.json', 'utf-8'))
        const updatedProfile = updateProfileUsingXCCDF(V3R6PercentString, fs.readFileSync(`test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml`, 'utf-8'), 'rule', createWinstonLogger())
        expect(updatedProfile.profile.controls[3].describe).toEqual(ruby_describe_block);
    })
})