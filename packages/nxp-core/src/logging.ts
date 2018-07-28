import { Application } from 'express';
import ILogger from './interfaces/ilogger';

const UUID = 'UUID';
/**
 * Add Logging configuration to the app server
 * @param app Express applicatton
 */
export const configLogging = (app: Application, logger: ILogger) => {
  app.use((req: any, res, next) => {
    // If UUID set in the cookie then add to the log for tracking
    if (req.cookies[UUID] !== undefined) {
      logger.setUUID(req.cookies[UUID]);
    } else {
      // unset previously set value if any
      logger.setUUID(undefined);
    }
    next();
  });
};
