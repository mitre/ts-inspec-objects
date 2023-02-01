// Utilities to update a profile or control with new metadata
// The ultimate goal is to preserve all the metadata that is already there and only add what is new

import _ from 'lodash'
import winston from 'winston';
import Control from '../objects/control'
import Profile from '../objects/profile'
import {processXCCDF} from '../parsers/xccdf'
import {ProfileDiff} from '../types/diff'
import {OvalDefinitionValue} from '../types/oval'
import {diffProfile} from './diff'
import {createDiffMarkdown} from './diffMarkdown'

export type UpdatedProfileReturn = {
    profile: Profile,
    diff: {ignoreFormattingDiff: ProfileDiff, rawDiff: Record<string, unknown>},
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

function getRangesFromStackUpdate(text: string): number[][] {  
  const delims: {[key: string]: string} = {'(': ')', '{': '}', '[': ']', '<': '>'}
  const quotes = '\'"`'
  const strings = 'qQriIwWxs'

  const stack: string[] = []
  const rangeStack: number[][] = []
  const ranges: number[][] = []

  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    let j = 0
    while (j < lines[i].length) {
      const line = lines[i]
      let char = line[j]

      const isEmptyStack = (stack.length == 0)
      const isNotEmptyStack = (stack.length > 0)

      const isQuoteChar = quotes.includes(char)
      const isNotEscapeChar = ((j == 0) || (j > 0 && line[j - 1] != '\\'))
      const isPercentChar = (char == '%')
      const isStringDelimiterChar = ((j < line.length - 1) && (/^[^A-Za-z0-9]$/.test(line[j + 1])))
      const isCommentBeginChar = ((j == 0) && (line.length >= 6) && (line.slice(0, 6) == '=begin'))
      
      const conditionOne = ((j < line.length - 1) && (strings.includes(line[j + 1])))
      const conditionTwo = ((j < line.length - 2) && (/^[^A-Za-z0-9]$/.test(line[j + 2])))
      const isSpecialDelimiterChar = (conditionOne && conditionTwo)

      let baseCondition = (isEmptyStack && isNotEscapeChar)
      const quotePushCondition = (baseCondition && isQuoteChar)
      const stringPushCondition = (baseCondition && isPercentChar && isStringDelimiterChar)
      const specialPushCondition = (baseCondition && isPercentChar && isSpecialDelimiterChar)
      const commentBeginCondition = (baseCondition && isCommentBeginChar)

      if (stringPushCondition) {
        j += 1
      } else if (specialPushCondition) {
        j += 2
      } else if (commentBeginCondition) {
        j += 6
      }
      char = line[j]

      baseCondition = (isNotEmptyStack && isNotEscapeChar)
      const delimiterCondition = (baseCondition && Object.keys(delims).includes(stack[stack.length - 1]))
      const delimiterPushCondition = (delimiterCondition && (stack[stack.length - 1] == char))
      const delimiterPopCondition = (delimiterCondition && (delims[stack[stack.length - 1] as string] == char))
      const basePopCondition = (baseCondition && (stack[stack.length - 1] == char) && !Object.keys(delims).includes(char))
      const isCommentEndChar = ((j == 0) && (line.length >= 4) && (line.slice(0, 4) == '=end'))
      const commentEndCondition = (baseCondition && isCommentEndChar && (stack[stack.length - 1] == '=begin'))
      
      if (basePopCondition || delimiterPopCondition || commentEndCondition) {
        stack.pop()
        rangeStack[rangeStack.length -1].push(i)
        const range_ = rangeStack.pop() as number[]
        if (rangeStack.length == 0) {
          ranges.push(range_)
        }
      } else if (quotePushCondition || stringPushCondition || specialPushCondition ||
        delimiterPushCondition || commentBeginCondition) {
        if (commentBeginCondition) {
          stack.push('=begin')
        } else {
          stack.push(char)
        }
        rangeStack.push([i])
      }
      j++
    }
  }
  return ranges
}

function getDistinctRanges(ranges: number[][]): number[][] {
  const output: number[][] = []
  for (const [x, y] of ranges) {
    if (x !== y) {
      output.push([x, y])
    }
  }
  return output
}

function joinStringsFromRanges(text: string, ranges: number[][]): string[] {
  const lines = text.split('\n')
  const output: string[] = []
  let i = 0
  while (i < lines.length) {
    let found = false
    for (const [x, y] of ranges) {
      if (i >= x && i <= y) {
        output.push(lines.slice(x, y + 1).join(' '))
        found = true
        i = y
        break
      }
    }
    if (!found) {
      output.push(lines[i])
    }
    i++
  }
  return output
}

/*
  This is the most likely thing to break if you are getting code formatting issues.
  Extract the existing describe blocks (what is actually run by inspec for validation)
*/
export function getExistingDescribeFromControl(control: Control): string {
  if (control.code) {
    // Join multi-line strings in Control block.
    let ranges = getRangesFromStackUpdate(control.code)
    ranges = getDistinctRanges(ranges)
    const lines = joinStringsFromRanges(control.code, ranges)

    // Define RegExp for lines to skip.
    const skip = ['control\\W', '  title\\W', '  desc\\W', '  impact\\W', '  tag\\W', '  ref\\W']
    const skipRegExp = RegExp(skip.map(x => `(^${x})`).join('|'))

    // Extract logic from code.
    const logic: string[] = []
    let ignoreNewLine = true
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const checkRegExp = ((line.trim() !== '') && !skipRegExp.test(line))
      const checkNewLine = ((line.trim() === '') && !ignoreNewLine)
      
      if (checkRegExp || checkNewLine) {
        logic.push(line)
        ignoreNewLine = false
      } else {
        ignoreNewLine = true
      }
    }

    // Return synthesized logic
    return logic.slice(0, logic.length - 2).join('\n') // Drop trailing ['end', '\n'] from Control block.
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