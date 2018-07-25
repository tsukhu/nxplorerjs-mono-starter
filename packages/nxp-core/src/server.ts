import * as express from 'express';
import * as partialResponse from 'express-partial-response';
import * as path from 'path';
import {
  swaggerify,
  secureApp,
  configLogging,
  configMetrics,
  configHealthChecks,
  addCompression
} from '.';
import ILogger from './interfaces/ilogger';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

const responseTime = require('response-time');

/**
 * Node Express Server setup and configuration
 */
export class ExpressServer {
  public server: InversifyExpressServer;

  constructor(container: Container, logger: ILogger, apiPath: string) {
    let root: string;

    // Setup application root
    root =
      process.env.NODE_ENV === 'development'
        ? path.normalize(__dirname + '/../..')
        : path.normalize('.');

    this.server = new InversifyExpressServer(container, undefined, {
      rootPath: '/api/v1'
    });
    this.server.setConfig(app => {
      // Add security configuration
      secureApp(app);

      // Add public folder
      app.use(express.static(`${root}/public`));

      // Add response time support
      // This will add x-response-time to the response headers
      app.use(responseTime({ suffix: false }));

      // Add partial response support
      app.use(partialResponse());

      // Add logging configuration
      configLogging(app, logger);

      // Add metrics configuration
      configMetrics(app);

      // Configure Healthchecks
      configHealthChecks(app);

      // Add Compression support
      addCompression(app);

      // Add swagger support
      swaggerify(app, apiPath);
    });
  }

  public getServer = (): InversifyExpressServer => {
    return this.server;
  };
}
