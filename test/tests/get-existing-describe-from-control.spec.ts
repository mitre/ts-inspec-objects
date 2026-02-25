import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import Control from '../../src/objects/control';
import { getExistingDescribeFromControl, processInSpecProfile, updateControlDescribeBlock } from '../../src/index';
import { createWinstonLogger } from '../../src/utilities/logging';

const TEST_USE_CASES = new Set(['array-in-header', 'back-ticks', 'comments-on-describe-block', 'comments', 'double-quotes', 'end-of-line', 'end-on-control', 'end-on-desc', 'end-on-impact', 'end-on-ref', 'end-on-tag', 'end-on-title', 'hash-in-header', 'headers-in-describe', 'input-in-metadata', 'keywords-in-strings', 'mixed-quotes', 'multi-line-describe-block', 'multi-line-in-tags', 'multiple-single-line-inputs', 'parenthesis-in-header', 'percent-literals', 'percent-strings', 'single-quotes', 'start-of-line-input', 'old-control-new-control']);

describe('describe block extraction', () => {
  const pathToTestCases = 'test/sample_data/controls-for-describe-tests';
  const pathToTestResults = 'test/sample_data/controls-test-results';

  for (const file of TEST_USE_CASES as Set<string>) {
    let generatedOutput: string;

    if (file.includes('old-control-new-control')) {
      const inspecProfile = processInSpecProfile(fs.readFileSync(path.join(pathToTestCases, 'control-tests', 'new-control.json'), 'utf8'));
      const newControl = inspecProfile.controls[0];
      const oldControl = processInSpecProfile(fs.readFileSync(path.join(pathToTestCases, 'control-tests', 'old-control.json'), 'utf8')).controls[0];
      generatedOutput = updateControlDescribeBlock(oldControl, newControl, createWinstonLogger('ts-inspec-objects')).toString();
    } else {
      const controlCode = fs.readFileSync(path.join(pathToTestCases, 'control-tests', `${file}.rb`), 'utf8');
      const testControl = new Control({ code: controlCode });
      generatedOutput = getExistingDescribeFromControl(testControl);
    }
    fs.writeFileSync(path.join(pathToTestResults, `${file}.rb`), generatedOutput);

    const expectedOutput = fs.readFileSync(path.join(pathToTestCases, 'expected-results', `${file}.rb`), 'utf8');
    it(`should provide the proper describe block for use case -> ${file}`, () => {
      expect(generatedOutput.replaceAll(/\r/gi, '')).toEqual(expectedOutput.replaceAll(/\r/gi, ''));
    });
  }
});
