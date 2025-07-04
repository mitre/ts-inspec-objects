import fs from 'fs'
import path from 'path'
import {describe, expect, it} from 'vitest'
import {processInSpecProfile} from '../../src/index'

const TEST_USE_CASES = new Map();
TEST_USE_CASES.set('SV-204392', 'should correctly write the control structure using single quote string as suggested by cookstyle');
TEST_USE_CASES.set('SV-204474','should properly write a control with complicated fix text using %q() ruby annotation as suggested by cookstyle');
TEST_USE_CASES.set('SV-205653','should properly write a control with simple description block');
TEST_USE_CASES.set('SV-205734','should properly write a control with embedded %q() cookstyle formatting');
TEST_USE_CASES.set('SV-230385','should extract describe block that includes keywords (e.g., tag, impact).');
TEST_USE_CASES.set('V-92975','should properly write a control with complicated and long describe block');
TEST_USE_CASES.set('V-92979','should properly write a control with long tag arrays');
TEST_USE_CASES.set('V-93033','should properly write a control with comments in the describe block');
TEST_USE_CASES.set('V-93149','should properly write a control with special characters in the desc block');


describe('The control functionality', () => {
  const cookstyle_profile = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/cookstyle-controls-profile.json', 'utf-8'))

  const allKeys =[ ...TEST_USE_CASES.keys() ];
  cookstyle_profile.controls.forEach(control => {
    if (allKeys.includes(control.id)) {
      fs.writeFileSync(path.join('test/sample_data/', 'controls-test-results', `${control.id}.rb`), control.toRuby(true))
    }
  })

  // These checks are comparing what the function "toRuby" is outputting with a small sample profile created from
  // the controls in the 'controls' folder, it generates the controls and compares with expected controls
  // listed in the 'inputs-interpolation' folder.
  // The 'controls-cookstyle' folder contains a '.rubocop.yml' and an inspec.yml file used for specifying inputs
  // interpolation and formatting options.
  // The controls are formatted with cookstyle and the profile is generated using InSpec as instructed below.
  // NOTE: Cookstyle may update and change over time, requiring updates to this test suite.

  /* 
    To update or change this test, do the following:
      1. Install the cookstyle gem on your development environment
        a. To install the gem use: gem install cookstyle
        b. To verify that the gem is install use: gem list cookstyle
      2. Run "cookstyle -a ./test/sample_data/controls-cookstyle" to modify the expected controls from control-cookstyle
         to be in the cookstyle format
      3. Run "inspec json ./test/sample_data/controls-cookstyle > ./test/sample_data/inspec/json/cookstyle-controls-profile.json"
         to generate the inspec profile used for testing with the latest controls
      4. Run "npm run test" or "npm run test -- ./test/tests/control.spec.ts" to see the output. 
      5. Compare the expected and actual results.
      6. Make any changes in the control.ts functionality
  */

  // NOTE:
  //   The "expected" files were generated using end of line characters (CRLF). 
  //   We remove all CR from both files before comparing

  TEST_USE_CASES.forEach((value, key) => {
    const generated = fs.readFileSync(path.join('test/sample_data/controls-test-results', `${key}.rb`),'utf-8')
    const expected = fs.readFileSync(path.join('test/sample_data/controls-cookstyle/inputs-interpolation', `${key}.rb`), 'utf-8')
    it(value, () => {
      expect(generated.replace(/\r/gi, '')).toEqual(expected.replace(/\r/gi, ''));
    })    
  })
})
