import fs from 'fs'
import path from 'path';
import Control from '../../src/objects/control'
import {getExistingDescribeFromControl} from '../../src/index'

const TEST_USE_CASES = new Set();
TEST_USE_CASES.add('array-in-header');
TEST_USE_CASES.add('back-ticks');
TEST_USE_CASES.add('comments-on-describe-block');
TEST_USE_CASES.add('comments');
TEST_USE_CASES.add('double-quotes');
TEST_USE_CASES.add('end-of-line');
TEST_USE_CASES.add('end-on-control');
TEST_USE_CASES.add('end-on-desc');
TEST_USE_CASES.add('end-on-impact');
TEST_USE_CASES.add('end-on-ref');
TEST_USE_CASES.add('end-on-tag');
TEST_USE_CASES.add('end-on-title');
TEST_USE_CASES.add('hash-in-header');
TEST_USE_CASES.add('headers-in-describe');
TEST_USE_CASES.add('input-in-metadata');
TEST_USE_CASES.add('keywords-in-strings');
TEST_USE_CASES.add('mixed-quotes');
TEST_USE_CASES.add('multi-line-describe-block');
TEST_USE_CASES.add('multi-line-in-tags');
TEST_USE_CASES.add('multiple-single-line-inputs');
TEST_USE_CASES.add('parenthesis-in-header');
TEST_USE_CASES.add('percent-literals');
TEST_USE_CASES.add('percent-strings');
TEST_USE_CASES.add('single-quotes');
TEST_USE_CASES.add('start-of-line-input');

describe('describe block extraction', () => {
  const pathToTestCases = 'test/sample_data/controls-for-describe-tests'
  const pathToTestResults = 'test/sample_data/controls-test-results'

  for (const file of TEST_USE_CASES) {
    const controlCode = fs.readFileSync(path.join(pathToTestCases, 'control-tests', `${file}.rb`), 'utf-8')
    const testControl = new Control({code: controlCode})
    const generatedOutput = getExistingDescribeFromControl(testControl)
    fs.writeFileSync(path.join(pathToTestResults, `${file}.rb`), generatedOutput)

    const expectedOutput = fs.readFileSync(path.join(pathToTestCases, 'expected-results', `${file}.rb`), 'utf-8')
    it(`should provide the proper describe block for use case -> ${file}`, () => {
      expect(generatedOutput).toEqual(expectedOutput);
    })
  }
});
