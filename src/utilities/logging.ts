import { createLogger, format, transports, type Logger } from 'winston';

// Use user defined colors. Used by the console log transporter
const syslogColors = {
  debug: 'blue',
  info: 'cyan',
  notice: 'white',
  warn: 'magenta',
  warning: 'bold magenta',
  error: 'bold red',
  verbose: 'blue',
  crit: 'inverse yellow',
  alert: 'bold inverse red',
  emerg: 'bold inverse magenta',
  prefix: 'yellow',
};

export function createWinstonLogger(library = 'inspec-objects', level = 'debug'): Logger {
  const colorizer = format.colorize({ colors: syslogColors });
  return createLogger({
    level: level,
    transports: [new transports.Console()],
    format: format.combine(
      format.simple(),
      format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss Z',
      }),
      format.errors({ stack: true }),
      format.printf(
        (info) => {
          const prefix = colorizer.colorize('prefix', `[${[info.timestamp]} -> ${library}]:`);
          const msg = colorizer.colorize(info.level, JSON.stringify(info.stack, null, 2) || JSON.stringify(info.message, null, 2) || '');
          return `${prefix} ${msg}`;
        },
      ),
    ),
  });
}
