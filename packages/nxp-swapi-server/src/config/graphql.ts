import { formatError } from 'apollo-errors';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { Config } from 'apollo-server-core';
import {
  fetchPeople,
  fetchPeopleWithPlanet,
  fetchPlanet,
  fetchStarship
} from '../graphql/dataloader/starwars';
import StarwarsAPI from '../graphql/datasource/starwars-api';
import { mocks, resolvers, typeDefs } from '../graphql/setupSchema';
const DataLoader = require('dataloader');

// Tracing Configuration
const tracing =
  process.env.GRAPHQL_TRACING !== undefined &&
  process.env.GRAPHQL_TRACING === 'true'
    ? true
    : false;

export const getGraphQLConfig = (): Config => {
  // Data Loaders with Batch and Cache Enabled
  const peopleLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchPeople))
  );
  const planetLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchPlanet))
  );
  const starshipLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchStarship))
  );
  const peopleWithPlanetLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchPeopleWithPlanet))
  );
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

  const myStarwarsAPI: any = new StarwarsAPI();

  return {
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        starwarsAPI: myStarwarsAPI
      };
    },
    cache: new InMemoryLRUCache({ maxSize: 100 }),
    mocks: serverMocks,
    formatError, // Error Handler
    tracing,
    playground,
    introspection: true,
    context: async ({ req, connection }) => {
      if (connection) {
        // check connection for metadata
        return {};
      } else {
        const user = getuser(req);
        return {
          // Setup the user context as well as the dataload context
          user,
          peopleLoader,
          planetLoader,
          starshipLoader,
          peopleWithPlanetLoader
        };
      }
    }
  };
};
