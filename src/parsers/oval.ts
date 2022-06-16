import { convertEncodedXmlIntoJson } from "../utilities/xccdf"
import {OvalDefinitionValue, Oval} from '../types/oval'

export function processOVAL(oval: string): Record<string, OvalDefinitionValue> {
    const parsed: Oval = convertEncodedXmlIntoJson(oval)

    const extractedDefintions: Record<string, OvalDefinitionValue> = {}

    for (const ovalDefinitions of parsed.oval_definitions) {
        for (const definitionList of ovalDefinitions.definitions) {
            for (const definition of definitionList.definition) { 
                extractedDefintions[definition["@_id"]] = definition
            }
        }
    }

    return extractedDefintions
}