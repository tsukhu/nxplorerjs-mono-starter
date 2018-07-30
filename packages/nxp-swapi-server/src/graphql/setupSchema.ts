import { gql } from 'apollo-server-express';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { GraphQLSchema } from 'graphql/type/schema';
import { merge } from 'lodash';
import mocks from './mocks';
import { StarwarsResolver } from './resolvers';

const typeDefs = gql(importSchema('src/graphql/schema/main.graphql'));

// Merge all the resolvers
const resolvers = merge(StarwarsResolver);

export { mocks, resolvers, typeDefs };

// Create GraphQL Schema with all the pieces in place
export const setupSchema = (): GraphQLSchema => {
  const myTypeDefs = importSchema('src/graphql/schema/main.graphql');
  const schema = makeExecutableSchema({
    typeDefs: myTypeDefs,
    resolvers: resolvers
  });

  if (
    process.env.GRAPHQL_MOCK !== undefined &&
    process.env.GRAPHQL_MOCK === 'true'
  ) {
    // Add mocks, modifies schema in place
    // Preserve resolvers that are implemented
    addMockFunctionsToSchema({
      schema,
      mocks: mocks,
      preserveResolvers: true
    });
  }
  return schema;
};
