import winston from 'winston';

export function createWinstonLogger(
  level = 'debug',
): winston.Logger {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    level: level,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss Z',
      }),
      winston.format.printf(
        info => `[${[info.timestamp]}] ${info.message}`,
      ),
    ),
  })
}