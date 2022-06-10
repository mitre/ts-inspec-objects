import _ from "lodash";

// Breaks lines down to lineLength number of characters
export function wrap(s: string, lineLength = 80): string {
  return s.replace(
    new RegExp(`(?![^\n]{1,${lineLength}}$)([^\n]{1,${lineLength}})`, "g"),
    "$1\n"
  );
}

export function unformatText(s: string): string {
  return s.replace(/\n/g, ' ').replace(/\\n/g, ' ').replace(/( +|\t)/g, ' ')
}

const escapeQuotes = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/'/g, "\\'"); // Escape backslashes and quotes
const escapeDoubleQuotes = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/"/g, '\\"'); // Escape backslashes and double quotes

const wrapAndEscapeQuotes = (s: string, lineLength?: number) =>
  escapeDoubleQuotes(wrap(s, lineLength)); // Escape backslashes and quotes, and wrap long lines

export { escapeQuotes, escapeDoubleQuotes, wrapAndEscapeQuotes };
