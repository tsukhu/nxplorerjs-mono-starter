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

// Single Node execution
// tslint:disable:no-console
const welcome = port =>
  console.log(
    `up and running in ${process.env.NODE_ENV ||
      'development'} @: ${os.hostname()} on port: ${port}`
  );

export const setupServer = async () => {
  // create server
  const container = IOCContainer.getInstance().getContainer();
  const logger = container.get<ILogger>(SERVICE_IDENTIFIER.LOGGER);
  const app = new ExpressServer(
    container,
    logger,
    path.join('./src/swagger', 'Api.yaml')
  )
    .getServer()
    .build();
  // Get Stiched Schema
  const graphqlConfig: Config = await getGraphQLConfig();
  const apolloServer: ApolloServer = createApolloServer(app, graphqlConfig);
  // Create Server so that it can be reused for the
  // configuring the SubscriptionServer
  const ws = http.createServer(app);

  if (process.env.GRAPHQL_SUBSCRIPTIONS === 'true') {
    apolloServer.installSubscriptionHandlers(ws);
  }
  // console.log(apolloServer.subscriptionsPath);
  ws.listen(process.env.PORT, err => {
    if (err) {
      throw new Error(err);
    }

    if (process.env.STREAM_HYSTRIX === 'true') {
      // configure Hystrix Support
      configHystrix();
    }

    welcome(process.env.PORT);
  });
};

setupServer();
