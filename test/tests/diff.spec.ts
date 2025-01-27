import fs from 'fs'
import _ from 'lodash'
import {diffProfile, processXCCDF} from '../../src/index'
import {createWinstonLogger} from '../../src/utilities/logging'
import {processInSpecProfile} from '../../src/parsers/json'

const thisLogger = createWinstonLogger('ts-inspec-objects')

const V1R2 = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R2_Manual-xccdf.xml', 'utf-8'), false, 'group');
const V1R3 = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/STIG/U_RHEL_8_STIG_V1R3_Manual-xccdf.xml', 'utf-8'), false, 'group');

const V2R6 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/RHEL7-V2R6-Profile.json', 'utf-8'));
const V2R7 = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/STIG/U_RHEL_7_STIG_V2R7_Manual-xccdf.xml', 'utf-8'), false, 'group');

const V3R7 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r7-mini-sample-profile.json', 'utf-8'));
const V3R6 = processInSpecProfile(fs.readFileSync('test/sample_data/inspec/json/rhel-7-v3r6-mini-profile.json', 'utf-8'));
const V3R8_rule = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml', 'utf-8'), false, 'rule');
const V3R8_group = processXCCDF(fs.readFileSync('test/sample_data/xccdf/input/STIG/rhel-7-v3r8-mini-sample-xxcdf.xml', 'utf-8'), false, 'group');

describe('The diff utils', () => {
  it('Successfully finds the difference between RHEL 8 V1R2 XCCDF and V1R3 XCCDF', () => {
    const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL8_V1R2_V1R3.json', 'utf-8'))
    expect(diffProfile(V1R2, V1R3, thisLogger)).toEqual(expected)
  })

  it('Successfully finds the difference between a RHEL 7 V2R6 InSpec Profile and V2R7 XCCDF', () => {
    const expected = JSON.parse(fs.readFileSync('test/sample_data/diffs/RHEL7_V2R6_V2R7.json', 'utf-8'))
    expect(diffProfile(V2R6, V2R7, thisLogger)).toEqual(expected)
  })
})

describe('The diff utils for controls with rule as Id', () => {
  const profileDiff_6 = diffProfile(V3R6, V3R8_rule, thisLogger);
  const profileDiff_7 = diffProfile(V3R7, V3R8_rule, thisLogger);
  
  it('should correctly identify added controls', () => {
    expect(profileDiff_7.rawDiff.addedControlIDs).toEqual(['SV-204394']);
  })
  it('should correctly identify removed controls', () => {
    expect(profileDiff_7.rawDiff.removedControlIDs).toEqual(['SV-204474']);
  })
  it('should correctly identify renamed controls', () => {
    expect(profileDiff_7.rawDiff.renamedControlIDs).toEqual({'V-73165': 'SV-204565'});
  })
  it('should correctly identify changes in existing controls', () => {
    // we know that the description in the sample's SV-251703 changed
    expect(_.get(profileDiff_7, 'rawDiff.changedControls.["SV-251703"].descs.check')).toBeTruthy();
  })
  it('should ignore whitespace for ignoreFormattedDiff, but consider whitespace changes for rawDiff', () => {
    // this particular control ONLY had a few newlines change in its description
    // ignoreFormattingDiff should ignore this, but rawDiff should not
    expect(_.get(profileDiff_7, 'ignoreFormattingDiff.changedControls.["SV-204392"].descs.check')).toBeFalsy();
    expect(_.get(profileDiff_7, 'rawDiff.changedControls.["SV-204392"].descs.check')).toBeTruthy();
  })
  it('should correctly identify no changes in control with ruby string formatting (%q)', () => {
    // this particular control ONLY had a few newlines change in its description
    // ignoreFormattingDiff should ignore this, but rawDiff should not
    expect(_.get(profileDiff_6, 'ignoreFormattingDiff.changedControls.["SV-204392"].descs.check')).toBeFalsy();
    expect(_.get(profileDiff_6, 'rawDiff.changedControls.["SV-204392"].descs.check')).toBeTruthy();
  })
  // Test nested rules in one group
})

describe('The diff utils for controls with group as Id', () => {
  const profileDiff_8 = diffProfile(V3R7, V3R8_group, thisLogger);
  const profileDiff_6 = diffProfile(V3R6, V3R8_group, thisLogger);

  it('should correctly identify added controls', () => {
    expect(profileDiff_8.rawDiff.addedControlIDs).toEqual(['V-204392', 'V-204394', 'V-251703']);
  })
  it('should correctly identify removed controls', () => {
    expect(profileDiff_8.rawDiff.removedControlIDs).toEqual(['SV-204392', 'SV-204474', 'SV-251703']);
  })
  it('should correctly identify renamed controls', () => {
    expect(profileDiff_8.rawDiff.renamedControlIDs).toEqual({'V-73165': 'V-204565'});
  })
  it('should correctly identify changes in existing controls', () => {
    // we know that the description in the sample's SV-251703 changed
    expect(_.get(profileDiff_8, 'rawDiff.changedControls.["V-204565"].descs.check')).toBeTruthy();
  })
  it('should ignore whitespace for ignoreFormattedDiff, but consider whitespace changes for rawDiff', () => {
    // this particular control ONLY had a few newlines change in its description
    // ignoreFormattingDiff should ignore this, but rawDiff should not
    expect(_.get(profileDiff_8, 'ignoreFormattingDiff.changedControls.["V-204392"].descs.check')).toBeFalsy();
    expect(_.get(profileDiff_8, 'rawDiff.changedControls.["V-204565"].descs.check')).toBeTruthy();
  })

  it('should correctly identify no changes in control with ruby string formatting (%q)', () => {
    // this particular control ONLY had a few newlines change in its description
    // ignoreFormattingDiff should ignore this, but rawDiff should not
    expect(_.get(profileDiff_6, 'ignoreFormattingDiff.changedControls.["SV-204392"].descs.check')).toBeFalsy();
    expect(_.get(profileDiff_6, 'rawDiff.changedControls.["V-204565"].descs.check')).toBeFalsy;
  })
  // Test nested rules in one group
})