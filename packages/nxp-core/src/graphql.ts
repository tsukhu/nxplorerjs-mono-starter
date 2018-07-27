import { Application } from 'express';
import { ApolloServer, Config } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as expressJwt from 'express-jwt';
import * as fs from 'fs';

/**
 * Configure GraphQL endpoints
 * @param app Express Application
 */

export const createApolloServer = (
  app: Application,
  config: Config
): ApolloServer => {
  // If JWT Auth is enabled added JWT header verification for all graphql
  // calls
  if (process.env.JWT_AUTH === 'true') {
    const RSA_PUBLIC_KEY = fs.readFileSync(process.env.RSA_PUBLIC_KEY_FILE);
    // If a valid Bearer token is present the req.user object is set
    // set those details in the context.user
    // The context can then be used by the resolvers to validate user credentials
    app.use(
      '/graphql',
      bodyParser.json(),
      expressJwt({ secret: RSA_PUBLIC_KEY, credentialsRequired: false })
    );
  }

  const server = new ApolloServer(config);
  const path = '/graphql';
  server.applyMiddleware({ app, path });

  return server;
};
