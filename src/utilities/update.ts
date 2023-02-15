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

function getRangesForLines(text: string): number[][] {  
  /*
    Returns an array containing two numerical indices (i.e., start and stop  
    line numbers) for each string or multi-line comment, given raw text as 
    an input parameter. The raw text is a string containing the entirety of an 
    InSpec control. 

    Algorithm utilizes a pair of stacks (i.e., `stack`, `rangeStack`) to keep 
    track of string delimiters and their associated line numbers, respectively.

    Combinations Handled:
    - Single quotes (')
    - Double quotes (")
    - Back ticks (`)
    - Mixed quotes ("`'")
    - Percent strings (%; keys: q, Q, r, i, I, w, W, x; delimiters: (), {}, 
      [], <>, most non-alphanumeric characters); (e.g., "%q()")
    - Percent literals (%; delimiters: (), {}, [], <>, most non-
      alphanumeric characters); (e.g., "%()")
    - Multi-line comments (e.g., =begin\nSome comment\n=end)
    - Variable delimiters (i.e., paranthesis: (); array: []; hash: {})
  */
  const stringDelimiters: {[key: string]: string} = {'(': ')', '{': '}', '[': ']', '<': '>'}
  const variableDelimiters: {[key: string]: string} = {'(': ')', '{': '}', '[': ']'}
  const quotes = '\'"`'
  const strings = 'qQriIwWxs'
  enum skipCharLength {
    string = '('.length,
    percentString = 'q('.length,
    commentBegin = '=begin'.length
  }

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
      const isVariableDelimiterChar = Object.keys(variableDelimiters).includes(char)
      const isStringDelimiterChar = ((j < line.length - 1) && (/^[^A-Za-z0-9]$/.test(line[j + 1])))
      const isCommentBeginChar = ((j == 0) && (line.length >= 6) && (line.slice(0, 6) == '=begin'))
      
      const isPercentStringKeyChar = ((j < line.length - 1) && (strings.includes(line[j + 1])))
      const isPercentStringDelimiterChar = ((j < line.length - 2) && (/^[^A-Za-z0-9]$/.test(line[j + 2])))
      const isPercentString = (isPercentStringKeyChar && isPercentStringDelimiterChar)

      let baseCondition = (isEmptyStack && isNotEscapeChar)
      const quotePushCondition = (baseCondition && isQuoteChar)
      const variablePushCondition = (baseCondition && isVariableDelimiterChar)
      const stringPushCondition = (baseCondition && isPercentChar && isStringDelimiterChar)
      const percentStringPushCondition = (baseCondition && isPercentChar && isPercentString)
      const commentBeginCondition = (baseCondition && isCommentBeginChar)

      if (stringPushCondition) {
        j += skipCharLength.string // j += 1
      } else if (percentStringPushCondition) {
        j += skipCharLength.percentString // j += 2
      } else if (commentBeginCondition) {
        j += skipCharLength.commentBegin // j += 6
      }
      char = line[j]

      baseCondition = (isNotEmptyStack && isNotEscapeChar)
      const delimiterCondition = (baseCondition && Object.keys(stringDelimiters).includes(stack[stack.length - 1]))
      const delimiterPushCondition = (delimiterCondition && (stack[stack.length - 1] == char))
      const delimiterPopCondition = (delimiterCondition && (stringDelimiters[stack[stack.length - 1] as string] == char))
      const basePopCondition = (baseCondition && (stack[stack.length - 1] == char) && !Object.keys(stringDelimiters).includes(char))
      const isCommentEndChar = ((j == 0) && (line.length >= 4) && (line.slice(0, 4) == '=end'))
      const commentEndCondition = (baseCondition && isCommentEndChar && (stack[stack.length - 1] == '=begin'))
      
      const popCondition = (basePopCondition || delimiterPopCondition || commentEndCondition)
      const pushCondition = (quotePushCondition || variablePushCondition || stringPushCondition || 
        percentStringPushCondition || delimiterPushCondition || commentBeginCondition)

      if (popCondition) {
        stack.pop()
        rangeStack[rangeStack.length -1].push(i)
        const range_ = rangeStack.pop() as number[]
        if (rangeStack.length == 0) {
          ranges.push(range_)
        }
      } else if (pushCondition) {
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

function joinMultiLineStringsFromRanges(text: string, ranges: number[][]): string[] {
  /*
    Returns an array of strings and joined strings at specified ranges, given 
    raw text as an input parameter.
  */
  const lines = text.split('\n')
  const output: string[] = []
  let i = 0
  while (i < lines.length) {
    let found = false
    let j = 0
    while (j < ranges.length) {
      const [startIndex, stopIndex] = ranges[j]
      if (i >= startIndex && i <= stopIndex) {
        output.push(lines.slice(startIndex, stopIndex + 1).join('\n'))
        ranges.splice(j, 1)
        found = true
        i = stopIndex
        break
      }
      j += 1
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
    const ranges = getRangesForLines(control.code)
    const lines = joinMultiLineStringsFromRanges(control.code, ranges)  // Array of full, collapsed line InSpec control

    // Define RegExp for lines to skip.
    const skip = ['control\\W', '  title\\W', '  desc\\W', '  impact\\W', '  tag\\W', '  ref\\W']
    const skipRegExp = RegExp(skip.map(x => `(^${x})`).join('|'))

    // Extract logic from code.
    const logic: string[] = []
    let ignoreNewLine = true
    for (const line of lines) {
      const checkRegExp = ((line.trim() !== '') && !skipRegExp.test(line))
      const checkNewLine = ((line.trim() === '') && !ignoreNewLine)
      
      // Include '\n' if it is part of describe block, otherwise skip line.
      if (checkRegExp || checkNewLine) {
        logic.push(line)
        ignoreNewLine = false
      } else {
        ignoreNewLine = true
      }
    }

    // Return synthesized logic as describe block
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
