import { formatError } from 'apollo-errors';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { Config } from 'apollo-server-core';
import { mocks, getMergedSchemas } from '../graphql/setupSchema';

// Tracing Configuration
const tracing =
  process.env.GRAPHQL_TRACING !== undefined &&
  process.env.GRAPHQL_TRACING === 'true'
    ? true
    : false;

export const getGraphQLConfig = async (): Promise<Config> => {
  const getuser = req => {
    if (process.env.JWT_AUTH === 'true') {
      return req.user ? req.user : Promise.resolve('');
    }
  };

  const playground =
    process.env.GRAPHQL_PLAYGROUND !== undefined &&
    process.env.GRAPHQL_PLAYGROUND === 'true'
      ? true
      : false;

  const serverMocks =
    process.env.GRAPHQL_MOCK !== undefined &&
    process.env.GRAPHQL_MOCK === 'true'
      ? mocks
      : false;
  return {
    cache: new InMemoryLRUCache({ maxSize: 100 }),
    schema: await getMergedSchemas(),
    mocks: serverMocks,
    formatError, // Error Handler
    tracing,
    playground,
    uploads: false,
    introspection: true,
    context: async ({ req, connection }) => {
      if (connection) {
        // check connection for metadata
        return {};
      } else {
        const user = getuser(req);
        return {
          // Setup the user context as well as the dataload context
          user
        };
      }
    }
  };
};
