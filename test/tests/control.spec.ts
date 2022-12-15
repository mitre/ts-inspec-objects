import { processInSpecProfile } from "../../src"
import fs from 'fs'
import path from 'path'

describe('The control functionality', () => {
    const cookstyle_profile = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/cookstyle-controls-profile.json', 'utf-8'))

    cookstyle_profile.controls.forEach(control => {
        // Write the new control to the controls folder
        fs.writeFileSync(path.join('test/sample_data/', 'controls-test-results', `${control.id}.rb`), control.toRuby())
    })
    
    // This check is comparing what the function "toRuby" is outputting with a small sample profile that has been formatted 
    // with cookstyle based on the given .rubocop.yml file. Not all default cookstyle conventions are followed.
    // For example, complicated strings are written with "" in the toRuby function rather than %q{} that is suggested by cookstyle.
    // Additionally, cookstyle may update and change over time.
    // To update or change the functionality of this test, do the following:
    // Install the cookstyle gem on your development environment
        // run "cookstyle -a ./test/sample_data/controls-cookstyle" to modify the expected controls from control-cookstyle to be in the cookstyle format
        // run "inspec json  ./test/sample_data/controls-cookstyle > ./test/sample_data/inspec/json/cookstyle-controls-profile.json" to generate the inspec profile used for testing with the latest controls
        // run "npm run test" or "npm run test -- ./test/tests/control.spec.ts" to see the output. 
        // Compare the expected and actual results.
        // Make any changes in the control.ts functionality
    it('should correctly write the control structure to ruby that has no changes', () => {
        expect(fs.readFileSync('test/sample_data/controls-test-results/SV-204474.rb', 'utf-8')).toEqual(fs.readFileSync('test/sample_data/controls-cookstyle/SV-204474.rb', 'utf-8'));
    })
})