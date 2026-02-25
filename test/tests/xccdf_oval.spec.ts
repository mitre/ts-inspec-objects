import fs from 'fs';
import { describe, expect, it } from 'vitest';
import { processXCCDF } from '../../src/index';
import { processOVAL } from '../../src/parsers/oval';

describe('The XCCDF and OVAL Parser', () => {
  it('Parses the Ubuntu 20.04 Benchmark', () => {
    const ubuntu2004Benchmark = fs.readFileSync('test/sample_data/xccdf/input/CIS/ssg-ubuntu2004-xccdf.xml', 'utf8');
    const ubuntu2004OVAL = processOVAL(fs.readFileSync('test/sample_data/oval/ssg-ubuntu2004-oval.xml', 'utf8'));
    const result = processXCCDF(ubuntu2004Benchmark, false, 'rule', ubuntu2004OVAL);
    // fs.writeFileSync('test/sample_data/profile-objects/Special/OVAL/Ubuntu-20.04-OVAL.json', JSON.stringify(result, null, 2));
    const expected = fs.readFileSync('test/sample_data/profile-objects/Special/OVAL/Ubuntu-20.04-OVAL.json', 'utf8');
    expect(JSON.stringify(result, null, 2)).toEqual(expected.replaceAll(/\r/gi, ''));
  });
});
