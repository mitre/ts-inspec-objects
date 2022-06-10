import fs from 'fs'
import {processXCCDF} from "../../index"

describe('The XCCDF Parser', () => {
    for (const file of fs.readdirSync('./test/sample_data/xccdf/input')) {
        it(`Successfully parses ${file}`, () => {
            const xccdfProfile = processXCCDF(fs.readFileSync(`./test/sample_data/xccdf/input/${file}`, 'utf-8'))
            fs.writeFileSync(`./test/sample_data/xccdf/output/${file}.json`, JSON.stringify(xccdfProfile, null, 2))
        })
    }
})