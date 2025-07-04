import fs from 'fs'
import { describe, it } from 'vitest'
import {processXCCDF} from '../../src/index'
import {processOVAL} from '../../src/parsers/oval'

describe('The XCCDF and OVAL Parser', () => {
  it('Parses the Ubuntu 20.04 Benchmark', () => {
    const ubuntu2004Benchmark = fs.readFileSync('test/sample_data/xccdf/input/CIS/ssg-ubuntu2004-xccdf.xml', 'utf-8');
    const ubuntu2004OVAL = processOVAL(fs.readFileSync('test/sample_data/oval/ssg-ubuntu2004-oval.xml', 'utf-8'));

    const result = processXCCDF(ubuntu2004Benchmark, false, 'rule', ubuntu2004OVAL);
        
    fs.writeFileSync('test/sample_data/profile-objects/Special/OVAL/Ubuntu-20.04-OVAL.json', JSON.stringify(result, null, 2));
  })
})
