import 'source-map-support/register';
import './env';
import {
  ExpressServer,
  SERVICE_IDENTIFIER,
  ILogger,
  configHystrix,
  createApolloServer
} from '@nxp/nxp-core';
import { ApolloServer, Config } from 'apollo-server-express';
import { getGraphQLConfig } from './config/graphql';
import { IOCContainer } from './config/ioc-container';
import * as path from 'path';
import * as os from 'os';
import * as http from 'http';
import * as ProgressBar from 'progress';

// Single Node execution
// tslint:disable:no-console
const welcome = port =>
  console.log(
    `up and running in ${process.env.NODE_ENV ||
      'development'} @: ${os.hostname()} on port: ${port}`
  );

export const setupServer = async () => {
  const bar = new ProgressBar('Server Startup [:bar] :percent :elapseds', {
    total: 5
  });

  // initialize the IOC container (1)
  bar.tick();
  const container = IOCContainer.getInstance().getContainer();
  const logger = container.get<ILogger>(SERVICE_IDENTIFIER.LOGGER);
  const serverPort = process.env.PORT || 3000;
  bar.tick();
  // create the inversify enabled express server (2)
  const app = new ExpressServer(
    container,
    logger,
    path.join('./src/swagger', 'Api.yaml')
  )
    .getServer()
    .build();
  bar.tick();
  // Get Stiched Schema (3)
  const graphqlConfig: Config = await getGraphQLConfig();
  bar.tick();
  // Create the apollo server
  const apolloServer: ApolloServer = createApolloServer(app, graphqlConfig);
  // Create Server so that it can be reused for the
  // configuring the SubscriptionServer
  const ws = http.createServer(app);

  if (process.env.GRAPHQL_SUBSCRIPTIONS === 'true') {
    apolloServer.installSubscriptionHandlers(ws);
  }

  // console.log(apolloServer.subscriptionsPath);
  // start listening to the requrests (5)
  ws.listen(serverPort, err => {
    if (err) {
      throw new Error(err);
    }

    if (process.env.STREAM_HYSTRIX === 'true') {
      // configure Hystrix Support
      configHystrix();
    }
    bar.tick();
    welcome(serverPort);
  });
};

setupServer();
