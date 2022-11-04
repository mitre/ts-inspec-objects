// Utilities to update a profile or control with new metadata
// The ultimate goal is to preserve all the metadata that is already there and only add what is new

import _ from 'lodash'
import winston from "winston";
import Control from '../objects/control'
import Profile from '../objects/profile'
import { processXCCDF } from '../parsers/xccdf'
import { ProfileDiff } from '../types/diff'
import { Oval, OvalDefinitionValue } from '../types/oval'
import { diffProfile } from './diff'
import { createDiffMarkdown } from './diffMarkdown'

export type UpdatedProfileReturn = {
    profile: Profile,
    diff: {ignoreFormattingDiff: ProfileDiff, rawDiff: Record<string, unknown>},
    markdown: string
}

const knownInSpecKeywords = ['title', 'desc', 'impact', 'ref', 'tag', "\""]

function projectValuesOntoExistingObj(dst: Record<string, unknown>, src: Record<string, unknown>, currentPath = ''): Record<string, unknown> {
    for (const updatedValue in src) {
        const existingValue = _.get(dst, updatedValue)

        // We have a new value for something that already exists in dst
        if (existingValue !== undefined) {
            if (typeof existingValue === 'object' && existingValue !== null && !Array.isArray(existingValue)) {
                dst[updatedValue] = projectValuesOntoExistingObj(existingValue as Record<string, unknown>, src[updatedValue] as Record<string, unknown>, currentPath + updatedValue + '.');
            } else if (typeof src[updatedValue] === 'string') {
                _.set(dst, updatedValue, (src[updatedValue] as string).trim())
            } else if (typeof src[updatedValue] === 'number') {
                _.set(dst, updatedValue, src[updatedValue])
            } else if (Array.isArray(src[updatedValue])) {
                const uniqueArrayValues = [...new Set((_.get(dst, updatedValue, []) as unknown[]).concat(src[updatedValue] as unknown[]))]
                _.set(dst, updatedValue, uniqueArrayValues)
            }
        }
    }

    return dst
}

// This is the most likely thing to break if you are getting code formatting issues.
// Extract the existing describe blocks (what is actually run by inspec for validation)
function getExistingDescribeFromControl(control: Control): string {
    if (control.code) {
        let existingDescribeBlock = ''
        let currentQuoteEscape = ''
        let inPercentBlock = false;
        let inQuoteBlock = false
        let inMetadataValueOverride = false
        let indentedMetadataOverride = false
        let inDescribeBlock = false;
        let mostSpacesSeen = 0;

        control.code.split('\n').forEach((line) => {
            const wordArray = line.trim().split(' ')
            const spaces = line.substring(0, line.indexOf(wordArray[0])).length

            if (spaces - mostSpacesSeen  > 10) {
              indentedMetadataOverride = true
            } else {
              mostSpacesSeen = spaces;
              indentedMetadataOverride = false
            }

            if ((!inPercentBlock && !inQuoteBlock && !inMetadataValueOverride && !indentedMetadataOverride) || inDescribeBlock) {
                if (inDescribeBlock && wordArray.length === 1 && wordArray.includes('')) {
                    existingDescribeBlock += '\n'
                }
                // Get the number of spaces at the beginning of the current line
                else if (spaces >= 2) {
                    const firstWord = wordArray[0]
                    if (knownInSpecKeywords.indexOf(firstWord.toLowerCase()) === -1 || (knownInSpecKeywords.indexOf(firstWord.toLowerCase()) !== -1 && spaces > 2) || inDescribeBlock) {
                        inDescribeBlock = true;
                        existingDescribeBlock += line + '\n'
                    }
                }
            }
            
            wordArray.forEach((word, index) => {
                if(word.includes('%q') && inPercentBlock === false) {
                    inPercentBlock = true;
                }
                const charArray = word.split('')
                charArray.forEach((char, index) => {
                    if (inPercentBlock) {
                        if (char === '}' && charArray[index - 1] !== '\\' && !inQuoteBlock) {
                            inPercentBlock = false;
                        }
                    }
                    if (char === '"' && charArray[index - 1] !== '\\') {
                        if (!currentQuoteEscape || !inQuoteBlock) {
                            currentQuoteEscape = '"'
                        }
                        if (currentQuoteEscape === '"') {
                            inQuoteBlock = !inQuoteBlock
                        }
                    } else if (char === "'" && charArray[index - 1] !== '\\') {
                        if (!currentQuoteEscape || !inQuoteBlock) {
                            currentQuoteEscape = "'"
                        }
                        if (currentQuoteEscape === "'") {
                            inQuoteBlock = !inQuoteBlock
                        }
                    }
                })
            })
        })
        // Take off the extra newline at the end
        return existingDescribeBlock.slice(0, -1)
    } else {
        return ''
    }
}

export function findUpdatedControlByAllIdentifiers(existingControl: Control, updatedControls: Control[]): Control | undefined {
    // Try to match based on IDs
    let updatedControl = updatedControls.find((updatedControl) => {
        return updatedControl.id.toLowerCase() === existingControl.id.toLowerCase()
    })
    
    if (updatedControl) {
        return updatedControl
    }

    // Try to match based on legacy identifiers
    updatedControl = updatedControls.find((updatedControl) => {
        return updatedControl.tags.legacy?.some((legacyTag) => {
            return legacyTag.toLowerCase() === existingControl.id?.toLowerCase()
        })
    })

    if (updatedControl) {
        return updatedControl
    }

    return undefined
}

export function updateControl(from: Control, update: Partial<Control>, logger: winston.Logger): Control {
    const existingDescribeBlock = getExistingDescribeFromControl(from)
    logger.debug(`Existing describe block for control ${from.id}: ${JSON.stringify(existingDescribeBlock)}`)
    const projectedControl = projectValuesOntoExistingObj(from as unknown as Record<string, unknown>, update) as unknown as Control
    projectedControl.describe = existingDescribeBlock
    return projectedControl
}

export function updateProfile(from: Profile, using: Profile, logger: winston.Logger): Omit<UpdatedProfileReturn, 'markdown'> {
    // Update the profile with the new metadata
    const to = new Profile(_.omit(from, 'controls'))
    // Find the diff
    const diff = diffProfile(from, using, logger);

    // Add the new controls
    diff.ignoreFormattingDiff.addedControlIDs.forEach(id => {
        const addedControl = diff.ignoreFormattingDiff.addedControls[id]
        if (addedControl) {
            logger.debug(`New Control: ${addedControl.id} - ${addedControl.title}`)
            to.controls.push(addedControl)
        } else {
            throw new Error(`New control ${id} added but don't have the control data`)
        }

    })

    // Update the existing controls
    for (const existingControl of from.controls) {
        const updatedControl = findUpdatedControlByAllIdentifiers(existingControl, using.controls)
        if (updatedControl) {
            const controlDiff = diff.ignoreFormattingDiff.changedControls[updatedControl.id]
            
            if (controlDiff) {
                to.controls.push(updateControl(existingControl, controlDiff, logger))
            } else {
                to.controls.push(existingControl)
            }
        }
    }

    return {
        profile: to,
        diff,
    }
}

export function updateProfileUsingXCCDF(from: Profile, using: string, id: 'group' | 'rule' | 'version' | 'cis', logger: winston.Logger, ovalDefinitions?: Record<string, OvalDefinitionValue>): UpdatedProfileReturn {
    logger.debug(`Updating profile ${from.name} with control IDs: ${id}`)

    // Parse the XCCDF benchmark and convert it into a Profile
    logger.debug('Loading XCCDF File')
    const xccdfProfile = processXCCDF(using, false, id, ovalDefinitions);
    logger.debug('Loaded XCCDF File')

    // Update the profile and return
    logger.debug('Creating updated profile')
    const updatedProfile = updateProfile(from, xccdfProfile, logger);
    logger.debug('Creating diff markdown')

    // Create the markdown
    const markdown = createDiffMarkdown(updatedProfile.diff)
    logger.debug('Profile update complete')

    return {
        profile: updatedProfile.profile,
        diff: updatedProfile.diff,
        markdown: markdown
    }
}