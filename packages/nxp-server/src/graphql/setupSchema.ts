import { gql } from 'apollo-server-express';
import {
  PubSub,
  addMockFunctionsToSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} from 'apollo-server';
import { importSchema } from 'graphql-import';
import { GraphQLSchema } from 'graphql/type/schema';
import { merge } from 'lodash';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import AuthDirective from './directives/authDirective';
import FormattableDateDirective from './directives/formattableDate';
import mocks from './mocks';
import {
  BlogResolver,
  ExampleResolver,
  MovieResolver,
  UserResolver
} from './resolvers';

export const pubsub = new PubSub();

const typeDefs = gql(importSchema('src/graphql/schema/main.graphql'));
const link = new HttpLink({ uri: 'http://localhost:4000/graphql', fetch });

export const setupRemoteSchema = async () => {
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link
  });

  return executableSchema;
};

// Merge all the resolvers
const resolvers = merge(
  ExampleResolver,
  UserResolver,
  MovieResolver,
  BlogResolver
);

const schemaDirectives = {
  date: FormattableDateDirective,
  auth: AuthDirective
};

export { mocks, schemaDirectives, resolvers, typeDefs };

export const getMergedSchemas = async () => {
  const localSchema = setupSchema();
  try {
    const remoteSchema = await setupRemoteSchema();
    return mergeSchemas({
      schemas: [localSchema, remoteSchema]
    });
  } catch (e) {
    console.log('Remote Schema error' + e);
    return localSchema;
  }
};

// Create GraphQL Schema with all the pieces in place
export const setupSchema = (): GraphQLSchema => {
  const myTypeDefs = importSchema('src/graphql/schema/main.graphql');
  const schema = makeExecutableSchema({
    typeDefs: myTypeDefs,
    resolvers: resolvers,
    schemaDirectives: {
      date: FormattableDateDirective,
      auth: AuthDirective
    }
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
