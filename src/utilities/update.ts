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
    diff: {simplified: ProfileDiff, originalDiff: Record<string, unknown>},
    markdown: string
}

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

function getExistingCodeFromControl(control: Control): string {
    if (control.code) {
        let existingDescribeBlock = ''
        control.code.split('\n').forEach((line) => {
            //console.log(line)
        })
        return existingDescribeBlock
    } else {
        return ''
    }
}

export function updateControl(from: Control, update: Partial<Control>): Control {
    const existingCode = getExistingCodeFromControl(from)
    return projectValuesOntoExistingObj(from as unknown as Record<string, unknown>, update) as unknown as Control
}

export function updateProfile(from: Profile, using: Profile): Omit<UpdatedProfileReturn, 'markdown'> {
    // Update the profile with the new metadata
    const to = new Profile(_.omit(from, 'controls'))
    // Find the diff
    const diff = diffProfile(from, using);

    // Add the new controls
    diff.simplified.addedControlIDs.forEach(id => {
        const addedControl = diff.simplified.addedControls[id]
        if (addedControl) {
            to.controls.push(addedControl)
        } else {
            throw new Error("New control added but don't have the control data")
        }

    })

    // Update the existing controls
    for (const existingControl of from.controls) {
        const updatedControl = using.controls.find(control => control.id === existingControl.id)
        
        if (updatedControl) {
            const controlDiff = diff.simplified.changedControls[existingControl.id!]
            
            if (controlDiff) {
                to.controls.push(updateControl(existingControl, controlDiff))
            } else {
                to.controls.push(existingControl)
            }
        } else {
            console.log("Control not updated: " + existingControl.id)
        }
    }


    return {
        profile: to,
        diff,
    }
}

export function updateProfileUsingXCCDF(from: Profile, using: string, id: 'group' | 'rule' | 'version', logger: winston.Logger, ovalDefinitions?: Record<string, OvalDefinitionValue>): UpdatedProfileReturn {
    // Parse the XCCDF benchmark and convert it into a Profile
    logger.debug('Loading XCCDF File')
    const xccdfProfile = processXCCDF(using, false, id);
    logger.debug('Loaded XCCDF File')
    logger.debug('Loading XCCDF File with newline replacements')
    const xccdfProfileWithNLReplacement = processXCCDF(using, true, id);
    logger.debug('Loaded XCCDF File with newline replacements')
    // Update the profile and return
    logger.debug('Creating updated profile')
    const updatedProfile = updateProfile(from, xccdfProfile);
    logger.debug('Creating diff markdown')
    // Create the markdown
    const markdown = createDiffMarkdown(updatedProfile.diff, xccdfProfileWithNLReplacement)
    logger.debug('Profile update complete')
    return {
        profile: updatedProfile.profile,
        diff: updatedProfile.diff,
        markdown: markdown
    }
}