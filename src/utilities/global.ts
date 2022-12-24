import _ from 'lodash';

// Breaks lines down to lineLength number of characters
export function wrap(s: string, lineLength = 80): string {
  let newString = ''
  const currentLine = ''
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

const escapeQuotes = (s: string) => {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); // Escape backslashes and quotes
}

const escapeDoubleQuotes = (s: string) => {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); // Escape backslashes and double quotes
}

const wrapAndEscapeQuotes = (s: string, lineLength?: number) =>
  escapeDoubleQuotes(wrap(s, lineLength)); // Escape backslashes and quotes, and wrap long lines

export {escapeQuotes, escapeDoubleQuotes, wrapAndEscapeQuotes};

export function removeNewlinePlaceholders(s: string): string {
  return s.replace(/\{\{\{\{newlineHERE\}\}\}\}/g, '\n')
}

export function applyPercentStringSyntax(s: string): string {
  if(s.includes("'") || s.includes('"')) {
    return `%q(${removeNewlinePlaceholders(s)})`
  }
  else {
    return `'${escapeQuotes(removeNewlinePlaceholders(s))}'`
  }
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