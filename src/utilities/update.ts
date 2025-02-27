// Utilities to update a profile or control with new metadata
// The ultimate goal is to preserve all the metadata that is already there and only add what is new

import _ from 'lodash'
import winston from 'winston';
import {diffProfile} from './diff'
import Control from '../objects/control'
import Profile from '../objects/profile'
import {ProfileDiff} from '../types/diff'
import {processXCCDF} from '../parsers/xccdf'
import {OvalDefinitionValue} from '../types/oval'
import {createDiffMarkdown} from './diffMarkdown'

/**
 * Represents the return type of an updated profile operation.
 * 
 * @typedef UpdatedProfileReturn
 * 
 * @property {Profile} profile - The updated profile object.
 * @property {Object} diff - The differences between the original and updated profiles.
 * @property {ProfileDiff} diff.ignoreFormattingDiff - The differences ignoring formatting changes.
 * @property {Record<string, unknown>} diff.rawDiff - The raw differences as a record.
 * @property {string} markdown - The markdown representation of the differences.
 */
export type UpdatedProfileReturn = {
    profile: Profile,
    diff: {ignoreFormattingDiff: ProfileDiff, rawDiff: Record<string, unknown>},
    markdown: string
}

/**
 * Projects values from the source object onto the destination object,
 * updating the destination object in place.
 * 
 * @param dst - The destination object to be updated.
 * @param src - The source object containing new values.
 * @param currentPath - The current path being processed (used for nested objects).
 * @returns The updated destination object.
 * 
 * @remarks
 * - If a value in the source object is an object and the corresponding value
 *   in the destination object is also an object, the function will recursively
 *   update the nested object.
 * - If a value in the source object is a string, it will be trimmed before
 *   being set in the destination object.
 * - If a value in the source object is a number, it will be directly set in
 *   the destination object.
 * - If a value in the source object is an array, the function will merge it with
 *   the corresponding array in the destination object, ensuring unique values.
 */
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

/**
 * Returns an array containing two numerical indices (i.e., start and stop
 * line numbers) for each string or multi-line comment, given raw text as 
 * an input parameter. The raw text is a string containing the entirety of an 
 * InSpec control.
 * 
 * The function utilizes a pair of stacks (i.e., `stack`, `rangeStack`) to keep 
 * track of string delimiters and their associated line numbers, respectively.
 * 
 * Combinations Handled:
 * - Single quotes (')
 * - Double quotes (")
 * - Back ticks (`)
 * - Mixed quotes ("`'")
 * - Percent strings (%; keys: q, Q, r, i, I, w, W, x; delimiters: (), {}, 
 *   [], <>, most non-alphanumeric characters); (e.g., "%q()")
 * - Percent literals (%; delimiters: (), {}, [], <>, most non-
 *   alphanumeric characters); (e.g., "%()")
 * - Multi-line comments (e.g., =begin\nSome comment\n=end)
 * - Variable delimiters (i.e., parenthesis: (); array: []; hash: {})
 * 
 * @param text - The raw text containing the entirety of an InSpec control.
 * @returns An array of arrays, each containing two numerical indices representing
 * the start and stop line numbers for each string or multi-line comment.
 */
function getRangesForLines(text: string): number[][] {  
  const stringDelimiters: {[key: string]: string} = {'(': ')', '{': '}', '[': ']', '<': '>'}
  const variableDelimiters: {[key: string]: string} = {'(': ')', '{': '}', '[': ']'}
  const quotes = '\'"`'
  const strings = 'qQriIwWxs'
  enum skipCharLength {
    string = '('.length,
    percentString = 'q('.length,
    commentBegin = '=begin'.length,
    inlineInterpolationBegin = '{'.length
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
      const isCommentChar = /^\s*#/.test(line)
      const isInlineInterpolation = (char == '#' && ((j < line.length - 1) && line[j + 1] == '{'))
      
      const isPercentStringKeyChar = ((j < line.length - 1) && (strings.includes(line[j + 1])))
      const isPercentStringDelimiterChar = ((j < line.length - 2) && (/^[^A-Za-z0-9]$/.test(line[j + 2])))
      const isPercentString = (isPercentStringKeyChar && isPercentStringDelimiterChar)
      
      let baseCondition = (isEmptyStack && isNotEscapeChar)
      const quotePushCondition = (baseCondition && isQuoteChar)
      const variablePushCondition = (baseCondition && isVariableDelimiterChar)
      const stringPushCondition = (baseCondition && isPercentChar && isStringDelimiterChar)
      const percentStringPushCondition = (baseCondition && isPercentChar && isPercentString)
      const commentBeginCondition = (baseCondition && isCommentBeginChar)
      const commentCondition = (baseCondition && isCommentChar)
      const inlineInterpolationCondition = (isNotEmptyStack && isInlineInterpolation)
      
      if (commentCondition) {
        break
      }

      if (stringPushCondition) {
        j += skipCharLength.string // j += 1
      } else if (percentStringPushCondition) {
        j += skipCharLength.percentString // j += 2
      } else if (commentBeginCondition) {
        j += skipCharLength.commentBegin // j += 6
      } else if (inlineInterpolationCondition) {
        j += skipCharLength.inlineInterpolationBegin // j += 1
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
        percentStringPushCondition || delimiterPushCondition || commentBeginCondition || inlineInterpolationCondition)
        
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
        } else if (inlineInterpolationCondition) {
          stack.push('{')
        }  else {
          stack.push(char)
        }
        rangeStack.push([i])
      }
      j++
    }
  }
  return ranges
}

/**
 * Joins lines of text from specified ranges and returns an array of strings.
 * Each range is specified by a start and stop index, and the lines within
 * those ranges are joined together.
 *
 * @param text - The raw text input to be processed.
 * @param ranges - An array of ranges, where each range is a tuple containing
 *                 the start and stop indices (inclusive) of the lines to be joined.
 * @returns An array of strings, where lines within the specified ranges are joined.
 */
function joinMultiLineStringsFromRanges(text: string, ranges: number[][]): string[] {
  const originalLines = text.split('\n')
  const joinedLines: string[] = []
  let i = 0
  while (i < originalLines.length) {
    let foundInRanges = false
    for (const [startIndex, stopIndex] of ranges) {
      if (i >= startIndex && i <= stopIndex) {
        joinedLines.push(originalLines.slice(startIndex, stopIndex + 1).join('\n'))
        foundInRanges = true
        i = stopIndex
        break
      }
    }
    if (!foundInRanges) {
      joinedLines.push(originalLines[i])
    }
    i++
  }
  return joinedLines
}

/**
 * Filters out ranges that span only a single line. There is,
 * drops ranges with the same start and stop line numbers (i.e., strings 
 * that populate a single line)
 * 
 * @param ranges - An array of ranges, where each range is represented by a
 *                 tuple of start and stop line numbers.
 * @returns An array of ranges that span multiple lines.
 */
function getMultiLineRanges(ranges: number[][]): number[][] {
  const multiLineRanges: number[][] = []
  for (const [start, stop] of ranges) {
    if (start !== stop) {
      multiLineRanges.push([start, stop])
    }
  }
  return multiLineRanges
}

/**
 * This is the most likely thing to break if you are getting code formatting issues. 
 * 
 * Extracts the `describe` block (what is actually run by inspec for validation)
 * from an InSpec control object, collapsing multi-line strings.
 *
 * @param control - The InSpec control object containing the code to extract the `describe` block from.
 * @returns The extracted `describe` block as a string, or an empty string if the control has no code.
 */
export function getExistingDescribeFromControl(control: Control): string {
  if (control.code) {
    // Join multi-line strings in InSpec control.
    const ranges = getRangesForLines(control.code)

    // Get the entries that have delimiters that span multi-lines
    const multiLineRanges = getMultiLineRanges(ranges)

    // Array of lines representing the full InSpec control, with multi-line strings collapsed
    const lines = joinMultiLineStringsFromRanges(control.code, multiLineRanges)

    // Define RegExp for lines to skip.
    const skip = ['control\\W', '  title\\W', '  desc\\W', '  impact\\W', '  tag\\W', '  ref\\W']
    const skipRegExp = RegExp(skip.map(x => `(^${x})`).join('|'))

    // Extract describe block from InSpec control with collapsed multiline strings.
    const describeBlock: string[] = []
    let ignoreNewLine = true
    for (const line of lines) {
      const checkRegExp = ((line.trim() !== '') && !skipRegExp.test(line))
      const checkNewLine = ((line.trim() === '') && !ignoreNewLine)
     
      // Include '\n' if it is part of describe block, otherwise skip line.
      if (checkRegExp || checkNewLine) {
        describeBlock.push(line)
        ignoreNewLine = false
      } else {
        ignoreNewLine = true
      }
    }

    // Return synthesized logic as describe block
    const lastIndex = (describeBlock.lastIndexOf('end') === -1)
      ? describeBlock.lastIndexOf('end\r')
      : describeBlock.lastIndexOf('end')
    
    // Drop trailing ['end', '\n'] from Control block.
    return describeBlock.slice(0, lastIndex).join('\n') 
  } else {
    return ''
  }
}

/**
 * Finds an updated control from a list of updated controls by matching all possible identifiers.
 *
 * This function attempts to find a matching control in the `updatedControls` array by comparing
 * the `id` of the `existingControl` with the `id` of each control in the `updatedControls` array.
 * If no match is found based on `id`, it then tries to match based on legacy identifiers found
 * in the `tags.legacy` property of each control in the `updatedControls` array.
 *
 * @param existingControl - The control to find a match for in the updated controls.
 * @param updatedControls - An array of updated controls to search through.
 * @returns The matching updated control if found, otherwise `undefined`.
 */
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

/**
 * Updates a given control object with the provided partial update and logs the process.
 *
 * @param {Control} from - The original control object to be updated.
 * @param {Partial<Control>} update - An object containing the properties to update in the original control.
 * @param {winston.Logger} logger - A logger instance to log debug information.
 * @returns {Control} - The updated control object.
 */
export function updateControl(from: Control, update: Partial<Control>, logger: winston.Logger): Control {
  const existingDescribeBlock = getExistingDescribeFromControl(from)
  logger.debug(`Existing describe block for control ${from.id}: ${JSON.stringify(existingDescribeBlock)}`)
  const projectedControl = projectValuesOntoExistingObj(from as unknown as Record<string, unknown>, update) as unknown as Control
  projectedControl.describe = existingDescribeBlock
  return projectedControl
}

/**
 * Updates the describe block of a control with the describe block from another control.
 *
 * @param from - The control from which to get the existing describe block.
 * @param update - The partial control data to update.
 * @param logger - The logger instance to use for logging debug information.
 * @returns The updated control with the describe block from the `from` control.
 */
export function updateControlDescribeBlock(from: Control, update: Partial<Control>, logger: winston.Logger): Control {
  const existingDescribeBlock = getExistingDescribeFromControl(from)
  logger.debug(`Updating control ${update.id} with this describe block: ${JSON.stringify(existingDescribeBlock)}`)
  const projectedControl = new Control(update)
  projectedControl.describe = existingDescribeBlock
  return projectedControl
}

/**
 * Updates a given profile with new metadata and controls from another profile.
 *
 * @param from - The original profile to be updated.
 * @param using - The profile containing the new metadata and controls.
 * @param logger - A winston logger instance for logging debug information.
 * @returns An object containing the updated profile and the diff between the original and updated profiles, excluding markdown.
 *
 * @throws Will throw an error if a new control is added but the control data is not available.
 */
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

/**
 * Update a Profile with with new metadata from a XCCDF benchmark
 * 
 * @param from - A Profile object
 * @param using - An XCCDF in string format (XML)
 * @param id - Specifies the rule ID format to use ('group', 'rule', 'version', or 'cis').
 * @param logger - A winston logger instance for logging debug information.
 * @param ovalDefinitions - Optional OVAL definitions to use for resolving values.
 * @returns The Updated Profile (profile, the diff between from and using, and the markdown)
 */
export function updateProfileUsingXCCDF(from: Profile, using: string, id: 'group' | 'rule' | 'version' | 'cis', logger: winston.Logger, ovalDefinitions?: Record<string, OvalDefinitionValue>): UpdatedProfileReturn {
  logger.info(`Updating profile ${from.name} with control IDs type: ${id}`)

  // Parse the XCCDF benchmark and convert it into a Profile object
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
