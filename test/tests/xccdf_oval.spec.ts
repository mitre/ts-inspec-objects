import { processXCCDF } from "../../src"
import fs from 'fs'
import { processOVAL } from "../../src/parsers/oval"

describe('The XCCDF and OVAL Parser', () => {
    it('Parses the Ubuntu 20.04 Benchmark', () => {
        const ubuntu2004Benchmark = fs.readFileSync('test/sample_data/xccdf/input/Canonical_Ubuntu_20.04-xccdf.xml', 'utf-8')
        const ubuntu2004OVAL = processOVAL(fs.readFileSync('test/sample_data/oval/ssg-ubuntu2004-oval.xml', 'utf-8'))

        const result = processXCCDF(ubuntu2004Benchmark, ubuntu2004OVAL)
        
    })
})