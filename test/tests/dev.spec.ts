import { processXCCDF } from "../../src"
import fs from 'fs'

describe('do thing', () => {
    it.only('thing', () => {
        const ubuntu2004 = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/Canonical_Ubuntu_20.04-xccdf.xml', 'utf-8'))
    })

    it('other thing', () => {
        const ubuntu2004 = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/U_RHEL_7_STIG_V3R4_Manual-xccdf.xml', 'utf-8'))
    })
})