import fs from 'fs'
import {processOVAL} from '../../src/parsers/oval'

describe('The OVAL Parser', () => {
  it('Successfully parses Ubuntu 20.04 Benchmark OVAL', () => {
    const ubuntu2004 = processOVAL(fs.readFileSync('test/sample_data/oval/ssg-ubuntu2004-oval.xml', 'utf-8'))
  })
})