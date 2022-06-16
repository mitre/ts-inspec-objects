import { convertEncodedXmlIntoJson } from "../utilities/xccdf"

export function processOVAL(oval: string): Record<string, unknown> {
    const parsed = convertEncodedXmlIntoJson(oval)
    return parsed
}