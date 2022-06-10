import fs from 'fs'
import {diffProfile, processXCCDF} from "../../index"



describe('The diff utils', () => {
    it('Successfully finds the difference between RHEL 8 V1R2 and V1R3', () => {
        const V1R2 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/U_RHEL_8_STIG_V1R2_Manual-xccdf.xml`, 'utf-8'))
        const V1R3 = processXCCDF(fs.readFileSync(`test/sample_data/xccdf/input/U_RHEL_8_STIG_V1R3_Manual-xccdf.xml`, 'utf-8'))

        console.log(JSON.stringify(diffProfile(V1R2, V1R3), null, 2));
    })
})