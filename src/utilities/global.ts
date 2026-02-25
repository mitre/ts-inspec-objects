import _ from 'lodash';

/**
 * Wraps a given string to a specified line length by inserting newline characters.
 *
 * @param s - The string to be wrapped.
 * @param lineLength - The maximum length of each line before wrapping. Defaults to 80.
 * @returns The wrapped string with newline characters inserted at appropriate positions.
 */
export function wrap(s: string, lineLength = 80): string {
  let newString = '';
  let currentLength = 0;
  let shouldBreakLine = false;

  for (let i = 0; i < s.length; i++) {
    if (shouldBreakLine) {
      newString += '\n';
      currentLength = 0;
      shouldBreakLine = false;
    }
    const currentChar = s.charAt(i);
    const nextChar = s.charAt(i + 1);

    if (nextChar === ' ') {
      if (currentLength >= lineLength) {
        shouldBreakLine = true;
        newString += currentChar;
        currentLength++;
      } else {
        newString += currentChar;
        currentLength++;
      }
    } else {
      newString += currentChar;
      currentLength++;
    }
  }
  return newString;
}

/**
 * Removes newline characters and excessive whitespace from a given string.
 *
 * This function replaces all newline characters (`\n` and `\\n`) with a single space,
 * and collapses multiple spaces or tabs into a single space.
 *
 * @param s - The input string to be unformatted.
 * @returns The unformatted string with newline characters and excessive whitespace removed.
 */
export function unformatText(s: string): string {
  return s.replaceAll('\n', ' ').replaceAll(String.raw`\n`, ' ').replaceAll(/( +|\t)/g, ' ');
}

/**
 * Removes all whitespace characters from the given input string.
 *
 * @param input - The string from which to remove whitespace.
 * @returns A new string with all whitespace characters removed.
 */
export function removeWhitespace(input: string): string {
  return input.replaceAll(/\s/gi, '');
}

/**
 * Escapes backslashes that precede closing parentheses in a given string.
 *
 * This function searches for occurrences of backslashes followed by a closing
 * parenthesis in the input string and replaces each occurrence with two
 * backslashes followed by a closing parenthesis. This effectively escapes
 * the backslashes in such cases.
 *
 * @param s - The input string in which to escape backslashes.
 * @returns A new string with the specified backslashes escaped.
 */
const escapeSpecialCaseBackslashes = (s: string) => {
  return s.replaceAll(String.raw`\)`, String.raw`\\)`);
};

/**
 * Escapes single quotes and backslashes in a given string.
 *
 * This function replaces all backslashes (`\`) with double backslashes (`\\`)
 * and all single quotes (`'`) with escaped single quotes (`\'`).
 *
 * @param s - The input string to be escaped.
 * @returns The escaped string with single quotes and backslashes properly escaped.
 */
const escapeSingleQuotes = (s: string) => {
  return s.replaceAll('\\', '\\\\').replaceAll('\'', String.raw`\'`);
};

/**
 * Escapes backslashes and double quotes in a given string.
 *
 * This function replaces all backslashes (`\`) with double backslashes (`\\`)
 * and all double quotes (`"`) with escaped double quotes (`\"`).
 *
 * @param s - The input string to be escaped.
 * @returns The escaped string with backslashes and double quotes properly escaped.
 */
const escapeDoubleQuotes = (s: string) => {
  return s.replaceAll('\\', '\\\\').replaceAll('"', String.raw`\"`);
};

/**
 * Escapes quotes in a given string based on the presence of single and double quotes.
 *
 * - If the string contains both single and double quotes, it wraps the string in `%q()` and escapes special case backslashes.
 * - If the string contains only single quotes, it wraps the string in double quotes and escapes double quotes.
 * - If the string contains only double quotes or no quotes, it wraps the string in single quotes and escapes single quotes.
 *
 * @param s - The input string to escape quotes in.
 * @returns The string with appropriately escaped quotes.
 */
export function escapeQuotes(s: string): string {
  if (s.includes("'") && s.includes('"')) {
    return `%q(${escapeSpecialCaseBackslashes(removeNewlinePlaceholders(s))})`;
  } else if (s.includes("'")) {
    return `"${escapeDoubleQuotes(removeNewlinePlaceholders(s))}"`;
  } else {
    return `'${escapeSingleQuotes(removeNewlinePlaceholders(s))}'`;
  }
}

/**
 * Replaces all instances of the placeholder `{{{{newlineHERE}}}}` in the given string with newline characters.
 *
 * @param s - The string containing the placeholders to be replaced.
 * @returns The modified string with placeholders replaced by newline characters.
 */
export function removeNewlinePlaceholders(s: string): string {
  return s.replaceAll('{{{{newlineHERE}}}}', '\n');
}

/**
 * Retrieves the value from the first path in the provided paths array that exists in the given object.
 *
 * @param object - The object to search for the paths.
 * @param paths - An array of string paths to check in the object.
 * @returns The value from the first existing path in the object as a string.
 * @throws Will throw an error if none of the paths exist in the object.
 */
export function getFirstPath(
  object: Record<string, unknown>,
  paths: string[],
): string {
  const index = _.findIndex(paths, p => hasPath(object, p));

  if (index === -1) {
    throw new Error(
      `Attestation is missing one of these paths: ${paths.join(', ')}`,
    );
  } else {
    return _.get(object, paths[index]) as string;
  }
}

/**
 * Checks if the given file object has any of the specified paths.
 *
 * @param file - The object to check for the presence of the path(s).
 * @param path - A string or an array of strings representing the path(s) to check.
 * @returns `true` if any of the specified paths exist in the object, otherwise `false`.
 */
export function hasPath(
  file: Record<string, unknown>,
  path: string | string[],
): boolean {
  let pathArray;
  pathArray = typeof path === 'string' ? [path] : path;

  return _.some(pathArray, p => _.has(file, p));
}
