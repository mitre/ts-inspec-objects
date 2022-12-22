import { processInSpecProfile } from "../../src"
import fs from 'fs'
import path from 'path'

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

    /* To update or change this test, do the following:
        1. Install the cookstyle gem on your development environment
        2. Run "cookstyle -a ./test/sample_data/controls-cookstyle" to modify the expected controls from control-cookstyle to be in the cookstyle format
        3. Run "inspec json ./test/sample_data/controls-cookstyle > ./test/sample_data/inspec/json/cookstyle-controls-profile.json" to generate the inspec profile used for testing with the latest controls
        4. Run "npm run test" or "npm run test -- ./test/tests/control.spec.ts" to see the output. 
        5. Compare the expected and actual results.
        6. Make any changes in the control.ts functionality
    */
    it('should correctly write the control structure to ruby that has no changes', () => {
        expect(fs.readFileSync('test/sample_data/controls-test-results/SV-204474.rb', 'utf-8')).toEqual(fs.readFileSync('test/sample_data/controls-cookstyle/SV-204474.rb', 'utf-8'));
    })
})