import 'source-map-support/register';
import './env';
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

export const setupServer = () => {
  // create server
  const container = IOCContainer.getInstance().getContainer();
  const graphqlConfig: Config = getGraphQLConfig();
};

setupServer();
