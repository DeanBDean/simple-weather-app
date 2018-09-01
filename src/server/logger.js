import expressWinston from 'express-winston';
import winston, { format } from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.simple(),
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    })
  ]
});

export const logMiddleware = () => expressWinston.logger({
  expressFormat: true,
  meta: false,
  winstonInstance: logger
});
