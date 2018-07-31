import 'source-map-support/register';
import './env';
import { ApolloServer } from 'apollo-server-express';
import { getGraphQLConfig } from './config/graphql';
import * as express from 'express';

const PORT = process.env.PORT || 4000;

export const setupServer = () => {
  // create server
  const app = express();
  const server = new ApolloServer(getGraphQLConfig());
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

setupServer();
