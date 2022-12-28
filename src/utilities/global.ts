import _ from 'lodash';

// Breaks lines down to lineLength number of characters
export function wrap(s: string, lineLength = 80): string {
  let newString = ''
  let currentLength = 0
  let shouldBreakLine = false;

  for (let i = 0; i < s.length; i++) {
    if (shouldBreakLine) {
      newString += '\n';
      currentLength = 0;
      shouldBreakLine = false;
    }
    const currentChar = s.charAt(i)
    const nextChar = s.charAt(i + 1)

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

// Remove new lines and tabs
export function unformatText(s: string): string {
  return s.replace(/\n/g, ' ').replace(/\\n/g, ' ').replace(/( +|\t)/g, ' ')
}

export function removeWhitespace(input: string): string {
  return input.replace(/\s/gi, '')
}

const escapeSingleQuotes = (s: string) => {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); // Escape backslashes and quotes
}

const escapeDoubleQuotes = (s: string) => {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); // Escape backslashes and double quotes
}

export function escapeQuotes(s: string): string {
  if (s.includes("'") && s.includes('"')) {
    return `%q(${removeNewlinePlaceholders(s)})` 
  } else if (s.includes("'")) {
    return `"${escapeDoubleQuotes(removeNewlinePlaceholders(s))}"`
  } else {
    return `'${escapeSingleQuotes(removeNewlinePlaceholders(s))}'`
  }
}

export function removeNewlinePlaceholders(s: string): string {
  return s.replace(/\{\{\{\{newlineHERE\}\}\}\}/g, '\n')
}

export function getFirstPath(
  object: Record<string, unknown>,
  paths: string[]
): string {
  const index = _.findIndex(paths, (p) => hasPath(object, p));

  if (index === -1) {
    throw new Error(
      `Attestation is missing one of these paths: ${paths.join(', ')}`
    );
  } else {
    return _.get(object, paths[index]) as string;
  }
}

export function hasPath(
  file: Record<string, unknown>,
  path: string | string[]
): boolean {
  let pathArray;
  if (typeof path === 'string') {
    pathArray = [path];
  } else {
    pathArray = path;
  }

  return _.some(pathArray, (p) => _.has(file, p));
}