import { convertEncodedXmlIntoJson } from "../utilities/xccdf"
import {OvalDefinitionValue, Oval} from '../types/oval'

export function processOVAL(oval?: string): Record<string, OvalDefinitionValue> | undefined {
    if (!oval) {
        return undefined
    }
    
    const parsed: Oval = convertEncodedXmlIntoJson(oval)

    const extractedDefinitions: Record<string, OvalDefinitionValue> = {}

    for (const ovalDefinitions of parsed.oval_definitions) {
        for (const definitionList of ovalDefinitions.definitions) {
            for (const definition of definitionList.definition) { 
                extractedDefinitions[definition["@_id"]] = definition
            }
        }
    }

    return extractedDefinitions
}