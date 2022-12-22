import fs from 'fs'
import {processXCCDF} from "../../src/index"

describe('The XCCDF Parser', () => {
  for (const file of fs.readdirSync('./test/sample_data/xccdf/input/STIG')) {
    it(`Successfully parses STIG ${file}`, () => {
      const xccdfProfile = processXCCDF(fs.readFileSync(`./test/sample_data/xccdf/input/STIG/${file}`, 'utf-8'), false, 'group')
      fs.writeFileSync(`./test/sample_data/profile-objects/STIG/${file}.json`, JSON.stringify(xccdfProfile, null, 2))
    })
  }

  for (const file of fs.readdirSync('./test/sample_data/xccdf/input/CIS')) {
    it(`Successfully parses CIS Benchmark ${file}`, () => {
      const xccdfProfile = processXCCDF(fs.readFileSync(`./test/sample_data/xccdf/input/CIS/${file}`, 'utf-8'), false, 'group')
      fs.writeFileSync(`./test/sample_data/profile-objects/CIS/${file}.json`, JSON.stringify(xccdfProfile, null, 2))
    })
  }
})