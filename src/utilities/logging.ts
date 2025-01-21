import winston from 'winston';

export function createWinstonLogger(
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
        info => `\x1b[33m[${[info.timestamp]}]:\x1b[0m \x1b[34m${info.message}\x1b[0m`,
      ),
    ),
  })
}
