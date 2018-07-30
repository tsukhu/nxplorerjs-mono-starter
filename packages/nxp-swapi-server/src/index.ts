import 'source-map-support/register';
import './env';
import { ApolloServer, Config } from 'apollo-server-express';
import { getGraphQLConfig } from './config/graphql';
import * as express from 'express';

const PORT = 4000;

export const setupServer = () => {
  // create server
  const app = express();
  const server = new ApolloServer(getGraphQLConfig());
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

setupServer();
