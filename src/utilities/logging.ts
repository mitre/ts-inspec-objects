import winston from 'winston';

export function createWinstonLogger(
  mapperName: string,
  level = 'debug',
): winston.Logger {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    level: level,
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss Z',
      }),
      winston.format.printf(
        // Using the ANSI escape code sequence initiator (\xb[) to change output colors
        // Colors used are: 33m (yellow) and 34m (blue)
        // \x1b[0m : Resets the color settings to the default
        info => `\x1b[33m[${[info.timestamp]} -> ${mapperName}]:\x1b[0m \x1b[34m${info.message}\x1b[0m`,
      ),
    ),
  });
}
