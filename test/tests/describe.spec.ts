import fs from 'fs'
import Control from '../../src/objects/control'
import {getExistingDescribeFromControl} from '../../src/index'

describe('describe block extraction', () => {
  const pathToTestCases = 'test/sample_data/describe-test-cases'
  let files = fs.readdirSync(pathToTestCases)
  files = files.map(x => x.slice(0, x.length - 3)) // Remove the '.rb' from file names
  test.each(files)('case involving %s', (file) => {
    let expectedOutput = '  describe_block = nil' // Default expected output
    const controlCode = fs.readFileSync(`${pathToTestCases}/${file}.rb`, 'utf-8')
    const testControl = new Control({code: controlCode})
    const generatedOutput = getExistingDescribeFromControl(testControl)
    
    // Redefine variable `expectedOutput` for customized expected output, accordingly.
    // Tip: use an escaped string for readability (e.g., https://www.browserling.com/tools/add-slashes).
    if (file == 'comments') {
      expectedOutput = '  # Commodo sed egestas egestas fringilla.\n  # Ultricies tristique nulla aliquet enim. \n  describe_block = nil\n  # Volutpat consequat mauris nunc congue nisi.\n=begin \nPellentesque sit amet porttitor eget. Duis at tellus at urna. Pretium aenean \npharetra magna ac placerat vestibulum lectus mauris ultrices. Bibendum at \nvarius vel pharetra vel turpis nunc eget lorem. Ultrices mi tempus imperdiet \nnulla malesuada pellentesque elit eget gravida.\n=end\n\n  # This comment is in the describe block.\n\n=begin\nThis is a multi-line comment in the describe block.\n\nVestibulum lorem sed risus ultricies tristique nulla. Interdum velit euismod \nin pellentesque massa. Et magnis dis parturient montes nascetur ridiculus mus \nmauris vitae. Augue lacus viverra vitae congue eu. Et ultrices neque ornare \naenean. Lectus urna duis convallis convallis tellus id interdum velit.\n=end\n\n  describe_block = nil'
    } else if (file == 'headers-in-describe') {
      expectedOutput = '  describe_block = nil\n  if describe_block\n    impact 1.0\n    tag \'headers\': \'in describe\'\n    ref \'https://sample.com\'\n    desc \'Amet dictum sit amet justo.\'\n  end'
    } else if (file == 'multi-line-describe-block') {
      expectedOutput = '  describe \'Sed enim ut sem viverra. Elit pellentesque habitant morbi\n  tristique senectus et netus et malesuada. At tempor commodo ullamcorper\n  a lacus vestibulum.\' do\n    describe_block = true\n  end'
    } else if (file == 'keywords-in-strings') {
      expectedOutput = '  keyword_in_string = \'Lorem ipsum desc test control\'\n  describe_block = nil'
    }
    expect(generatedOutput).toEqual(expectedOutput);
  });
});
