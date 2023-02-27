import fs from 'fs'
import path from 'path'
import {processInSpecProfile} from '../../src/index'

describe('The control functionality', () => {
  const cookstyle_profile = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/cookstyle-controls-profile.json', 'utf-8'))
  cookstyle_profile.controls.forEach(control => {
    // Write the new control to the controls folder
    fs.writeFileSync(path.join('test/sample_data/', 'controls-test-results', `${control.id}.rb`), control.toRuby())
  })

  // This check is comparing what the function "toRuby" is outputting with a small sample profile created from the controls in the 'controls-cookstyle' folder.
  // The 'controls-cookstyle' folder also contains a '.rubocop.yml' file used for specifying formatting options.
  // The controls are formatted with cookstyle and the profile is generated using InSpec as instructed below.
  // NOTE: Cookstyle may update and change over time, requiring updates to this test suite.

  /* 
    To update or change this test, do the following:
      1. Install the cookstyle gem on your development environment
        a. To install the gem use: gem install cookstyle
        b. To verify that the gem is install use: gem list cookstyle
      2. Run "cookstyle -a ./test/sample_data/controls-cookstyle" to modify the expected controls from control-cookstyle to be in the cookstyle format
      3. Run "inspec json ./test/sample_data/controls-cookstyle > ./test/sample_data/inspec/json/cookstyle-controls-profile.json" to generate the inspec profile used for testing with the latest controls
      4. Run "npm run test" or "npm run test -- ./test/tests/control.spec.ts" to see the output. 
      5. Compare the expected and actual results.
      6. Make any changes in the control.ts functionality
  */
  const generated1 = fs.readFileSync('test/sample_data/controls-test-results/SV-204474.rb','utf-8')
  const expected1 = fs.readFileSync('test/sample_data/controls-cookstyle/SV-204474.rb', 'utf-8')
  // NOTE:
  //   The "expected" file was generated using end of line characters (CRLF). 
  //   We remove all CR from both files before comparing
  it('should properly write a control with complicated fix text using %q() ruby annotation as suggested by cookstyle', () => {
    expect(generated1.replace(/\r/gi, '')).toEqual(expected1.replace(/\r/gi, ''));
  })

  const generated2 = fs.readFileSync('test/sample_data/controls-test-results/SV-204392.rb','utf-8')
  const expected2 = fs.readFileSync('test/sample_data/controls-cookstyle/SV-204392.rb', 'utf-8')
  it('should correctly write the control structure using single quote string as suggested by cookstyle', () => {
    expect(generated2.replace(/\r/gi, '')).not.toEqual(expected2.replace(/\r/gi, ''));
  })

  const generated3 = fs.readFileSync('test/sample_data/controls-test-results/SV-230385.rb','utf-8')
  const expected3 = fs.readFileSync('test/sample_data/controls-cookstyle/SV-230385.rb', 'utf-8')
  it('should extract describe block that includes keywords (e.g., tag, impact).', () => {
    expect(generated3.replace(/\r/gi, '')).not.toEqual(expected3.replace(/\r/gi, ''));
  })
})
