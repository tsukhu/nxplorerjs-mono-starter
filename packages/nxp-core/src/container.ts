import 'reflect-metadata';
import { Container } from 'inversify';

import { LogService, MetricsService, SecurityService } from './services';
import { ILogger, IMetrics, ISecurity } from './interfaces';
import LoggerMiddleware from './middleware/logger-middleware';
import SERVICE_IDENTIFIER from './constants/identifiers';

export const createContainer = (): Container => {
  // Initialize the container
  const container = new Container();

  // Define service bindings
  container
    .bind<ILogger>(SERVICE_IDENTIFIER.LOGGER)
    .to(LogService)
    .inSingletonScope();
  container
    .bind<IMetrics>(SERVICE_IDENTIFIER.METRICS)
    .to(MetricsService)
    .inSingletonScope();
  container
    .bind<ISecurity>(SERVICE_IDENTIFIER.SECURITY)
    .to(SecurityService)
    .inSingletonScope();
  container
    .bind<LoggerMiddleware>(SERVICE_IDENTIFIER.LOGGER_MIDDLEWARE)
    .to(LoggerMiddleware);

  return container;
};
