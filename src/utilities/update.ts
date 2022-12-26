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

// const knownInSpecKeywords = ['title', 'desc', 'impact', 'ref', 'tag', '"']

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

/*
  Return first index found from given array that is not an empty entry (cell)
*/
function getIndexOfFirstLine(auditArray: string[], index: number, action: string): number {
  let indexVal = index;
  while (auditArray[indexVal] === '') {
    switch (action) {
      case '-':
        indexVal--
        break;
      case '+':
        indexVal++
        break;
    }
  }

  return indexVal
}

/*
  This is the most likely thing to break if you are getting code formatting issues.
  Extract the existing describe blocks (what is actually run by inspec for validation)
*/
export function getExistingDescribeFromControl(control: Control): string {
  // *** Option 1 ***
  // Algorithm: 
  //   Locate the index of the last occurrence of the meta-information 'tag'
  //   if: we have a tag do
  //     Place each line of the control code into an array
  //     loop: over the array starting at the end of the line the last meta-information 'tag' was found
  //       remove any empty before describe block content is found
  //       add found content to describe block variable, append EOL
  //     end
  //   end
  // Assumptions: 
  //  1 - The meta-information 'tag' precedes the describe block
  // Potential Problems:
  //  1 - The word 'tag' could be part of the describe block
//   if (control.code) {
//     let existingDescribeBlock = ''
//     const lastTag = control.code.lastIndexOf('tag')
//     if (lastTag > 0) {
//       const tagEOL = control.code.indexOf('\n',lastTag)
//       const lastEnd = control.code.lastIndexOf('end')    
//       let processLine = false
//       control.code.substring(tagEOL,lastEnd).split('\n').forEach((line) => {
//         // Ignore any blank lines at the beginning of the describe block
//         if (line !== '' || processLine) {
//           existingDescribeBlock += line + '\n'
//           processLine = true
//         }
//       })      
//     }
//     return existingDescribeBlock.trimEnd();
//   } else {
//     return ''
//   }

  // *** Option 2 ***
  // Algorithm:
  //   Locate the start and end od the control string
  //   Update the end of the control that contains information (if empty lines are at the end of the control)
  //   loop: until the start index is changed (loop is done from the bottom up)
  //     Clean testing array entry line (removes any non-print characters)
  //     if: line starts with meta-information 'tag' or 'ref'
  //       set start index to found location
  //       break out of the loop
  //     end
  //   end
  //   Remove any empty lines after the start index (in any)
  //   Extract the describe block from the audit control given the start and end indices
  // Assumptions: 
  //  1 - The meta-information 'tag' or 'ref' precedes the describe block
  // Pros:
  // Solves the potential issue with option 1, as the lookup for the meta-information
  // 'tag' or 'ref' is expected to the at the beginning of the line.
  if (control.code) {
    let existingDescribeBlock = ''
    let indexStart = control.code.toLowerCase().indexOf('control')
    let indexEnd = control.code.toLowerCase().trimEnd().lastIndexOf('end')
    const auditControl = control.code.substring(indexStart, indexEnd).split('\n')

    indexStart = 0
    indexEnd = auditControl.length - 1
    indexEnd = getIndexOfFirstLine(auditControl, indexEnd, '-')
    let index = indexEnd

    while (indexStart === 0) {
      const line = auditControl[index].toLowerCase().trim()
      if (line.indexOf('ref') === 0 || line.indexOf('tag') === 0) {
        indexStart = index + 1
      }
      index--
    }

    indexStart = getIndexOfFirstLine(auditControl, indexStart, '+')
    existingDescribeBlock = auditControl.slice(indexStart, indexEnd + 1).join('\n').toString()

    return existingDescribeBlock
  } else {
    return ''
  }

  // *** Original ***
  // if (control.code) {
  // let existingDescribeBlock = ''
  // let currentQuoteEscape = ''
  // const percentBlockRegexp = /%[qQrRiIwWxs]?(?<lDelimiter>[([{<])/;
  // let inPercentBlock = false;
  // let inQuoteBlock = false
  // const inMetadataValueOverride = false
  // let indentedMetadataOverride = false
  // let inDescribeBlock = false;
  // let mostSpacesSeen = 0;
  // let lDelimiter = '(';
  // let rDelimiter = ')';

  // control.code.split('\n').forEach((line) => {
  //   const wordArray = line.trim().split(' ')
  //   const spaces = line.substring(0, line.indexOf(wordArray[0])).length

  //   if (spaces - mostSpacesSeen  > 10) {
  //     indentedMetadataOverride = true
  //   } else {
  //     mostSpacesSeen = spaces;
  //     indentedMetadataOverride = false
  //   }

  //   if ((!inPercentBlock && !inQuoteBlock && !inMetadataValueOverride && !indentedMetadataOverride) || inDescribeBlock) {
  //     if (inDescribeBlock && wordArray.length === 1 && wordArray.includes('')) {
  //       existingDescribeBlock += '\n'
  //     }
  //     // Get the number of spaces at the beginning of the current line
  //     else if (spaces >= 2) {
  //       const firstWord = wordArray[0]
  //       if (knownInSpecKeywords.indexOf(firstWord.toLowerCase()) === -1 || (knownInSpecKeywords.indexOf(firstWord.toLowerCase()) !== -1 && spaces > 2) || inDescribeBlock) {
  //         inDescribeBlock = true;
  //         existingDescribeBlock += line + '\n'
  //       }
  //     }
  //   }

  //   wordArray.forEach((word, index) => {
  //     const percentBlockMatch = percentBlockRegexp.exec(word); 
  //     if(percentBlockMatch && inPercentBlock === false) {
  //       inPercentBlock = true;
  //       // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  //       lDelimiter = percentBlockMatch.groups!.lDelimiter || '(';
  //       switch(lDelimiter) { 
  //         case '{': { 
  //           rDelimiter = '}';
  //           break; 
  //         } 
  //         case '[': { 
  //           rDelimiter = ']';
  //           break; 
  //         } 
  //         case '<': { 
  //           rDelimiter = '>';
  //           break; 
  //         } 
  //         default: { 
  //           break; 
  //         } 
  //       }
                    
  //     }
  //     const charArray = word.split('')
  //     charArray.forEach((char, index) => {
  //       if (inPercentBlock) {
  //         if (char === rDelimiter && charArray[index - 1] !== '\\' && !inQuoteBlock) {
  //           inPercentBlock = false;
  //         }
  //       }
  //       if (char === '"' && charArray[index - 1] !== '\\') {
  //         if (!currentQuoteEscape || !inQuoteBlock) {
  //           currentQuoteEscape = '"'
  //         }
  //         if (currentQuoteEscape === '"') {
  //           inQuoteBlock = !inQuoteBlock
  //         }
  //       } else if (char === "'" && charArray[index - 1] !== '\\') {
  //         if (!currentQuoteEscape || !inQuoteBlock) {
  //           currentQuoteEscape = "'"
  //         }
  //         if (currentQuoteEscape === "'") {
  //           inQuoteBlock = !inQuoteBlock
  //         }
  //       }
  //     })
  //   })
  // })
  // // Take off the extra newline at the end
  // return existingDescribeBlock.slice(0, -1)
  // } else {
  //   return ''
  // }
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