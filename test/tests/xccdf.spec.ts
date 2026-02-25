import fs from 'fs';
import { describe, expect, it } from 'vitest';
import { processXCCDF } from '../../src/index';

// Expected XCCDF parsing to pass
describe('The XCCDF Parser', () => {
  const ruleIdTypes: string[] = ['group', 'rule', 'version'];

  for (const file of fs.readdirSync('./test/sample_data/xccdf/input/STIG')) {
    for (const ruleId of ruleIdTypes) {
      it(`Successfully parses STIG ${file} using rule Id "${ruleId}"`, () => {
        const xccdfProfile = processXCCDF(fs.readFileSync(`./test/sample_data/xccdf/input/STIG/${file}`, 'utf8'), false, ruleId as 'group' | 'rule' | 'version');
        fs.writeFileSync(`./test/sample_data/profile-objects/STIG/${file}.json`, JSON.stringify(xccdfProfile, null, 2));
      });
    }
  }

  ruleIdTypes.pop(); // remove the version rule type
  ruleIdTypes.push('cis'); // add the cis rule type
  for (const file of fs.readdirSync('./test/sample_data/xccdf/input/CIS')) {
    for (const ruleId of ruleIdTypes) {
      if (!(file.includes('ssg-ubuntu') && ruleId.includes('cis'))
        || (file.includes('ssg-ubuntu') && !ruleId.includes('cis'))
        || !file.includes('ssg-ubuntu')) {
        it(`Successfully parses CIS Benchmark ${file} using rule Id "${ruleId}"`, () => {
          const xccdfProfile = processXCCDF(fs.readFileSync(`./test/sample_data/xccdf/input/CIS/${file}`, 'utf8'), false, ruleId as 'group' | 'rule' | 'version' | 'cis');
          fs.writeFileSync(`./test/sample_data/profile-objects/CIS/${file}.json`, JSON.stringify(xccdfProfile, null, 2));
        });
      }
    }
  }
});

// Expected XCCDF parsing to fail due to invalid rule id
describe('The XCCDF Parser', () => {
  it('Fails to parse CIS Benchmark ssg-ubuntu1604-xccdf using rule Id "cis" due to improper rule id format', () => {
    expect(() => {
      const xccdfProfile = processXCCDF(fs.readFileSync('./test/sample_data/xccdf/input/CIS/ssg-ubuntu1604-xccdf.xml', 'utf8'), false, 'cis');
      fs.writeFileSync('./test/sample_data/profile-objects/CIS/ssg-ubuntu1604-xccdf.json', JSON.stringify(xccdfProfile, null, 2));
    }).toThrow(
      'Could not parse control ID from rule ID: harden_ssh_client_crypto_policy. Expecting something in this example format: xccdf_org.cisecurity.benchmarks_rule_1.1.11_Rule_title_summary',
    );
  });

  it('Fails to parse CIS Benchmark ssg-ubuntu1804-xccdf using rule Id "cis" due to improper rule id format', () => {
    expect(() => {
      const xccdfProfile = processXCCDF(fs.readFileSync('./test/sample_data/xccdf/input/CIS/ssg-ubuntu1804-xccdf.xml', 'utf8'), false, 'cis');
      fs.writeFileSync('./test/sample_data/profile-objects/CIS/ssg-ubuntu1804-xccdf.json', JSON.stringify(xccdfProfile, null, 2));
    }).toThrow(
      'Could not parse control ID from rule ID: harden_ssh_client_crypto_policy. Expecting something in this example format: xccdf_org.cisecurity.benchmarks_rule_1.1.11_Rule_title_summary',
    );
  });

  it('Fails to parse CIS Benchmark ssg-ubuntu2004-xccdf using rule Id "cis" due to improper rule id format', () => {
    expect(() => {
      const xccdfProfile = processXCCDF(fs.readFileSync('./test/sample_data/xccdf/input/CIS/ssg-ubuntu2004-xccdf.xml', 'utf8'), false, 'cis');
      fs.writeFileSync('./test/sample_data/profile-objects/CIS/ssg-ubuntu2004-xccdf.json', JSON.stringify(xccdfProfile, null, 2));
    }).toThrow(
      'Could not parse control ID from rule ID: disable_prelink. Expecting something in this example format: xccdf_org.cisecurity.benchmarks_rule_1.1.11_Rule_title_summary',
    );
  });
});

// Expected XCCDF parsing to fail due to formatting
describe('The XCCDF Parser', () => {
  it('throws an error if provided an improper format (not an XCCDF file) as input', () => {
    expect(() => {
      processXCCDF(fs.readFileSync('./test/sample_data/inspec/json/rhel-7-v3r6-mini-profile.json', 'utf8'), false, 'group');
    }).toThrow('Could not process the XCCDF file, check the input to make sure this is a properly formatted XCCDF file.');
  });
});
