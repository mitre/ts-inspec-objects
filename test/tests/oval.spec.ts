import fs from 'fs'
import { describe, expect, it } from 'vitest'
import {processOVAL} from '../../src/parsers/oval'

describe('The OVAL Parser', () => {
  it('Successfully parses Ubuntu 20.04 Benchmark OVAL', () => {
    const ubuntu2004 = processOVAL(fs.readFileSync('test/sample_data/oval/ssg-ubuntu2004-oval.xml', 'utf-8').replace(/\r/gi, ''));
    const expected = fs.readFileSync('./test/sample_data/oval/ssg-ubuntu2004-oval.json', 'utf-8')
    expect(JSON.stringify(ubuntu2004,null,2)).toEqual(expected.replace(/\r/gi, ''));
  })
})
