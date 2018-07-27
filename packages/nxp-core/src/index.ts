export { swaggerify } from './swagger';
export { secureApp } from './security';
export { configMetrics } from './metrics';
export { configLogging } from './logging';
export { configHystrix } from './hystrix';
export { configHealthChecks } from './healthchecks';
export { addCompression } from './compression';
export { createContainer } from './container';
export { createApolloServer } from './graphql';
export { ExpressServer } from './server';
export { SERVICE_IDENTIFIER } from './constants/identifiers';
export { ILogger, IMetrics, ISecurity, JWT_KeyType } from './interfaces';
export {
  authMiddleware,
  graphQLAuthMiddleware,
  getAuthenticatedUser,
  getUserRole,
  checkUser
} from './middleware/auth-middleware';
export { default as User } from './models/security.model';
export { IDGenerator } from './utils';
