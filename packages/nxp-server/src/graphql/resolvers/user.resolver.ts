import {
  ISecurity,
  JWT_KeyType,
  SERVICE_IDENTIFIER,
  User
} from '@nxp/nxp-core';
import * as jwt from 'jsonwebtoken';
import { APP_SERVICE_IDENTIFIER } from '../../api/constants/identifiers';
import IUser from '../../api/interfaces/iuser';
import { IOCContainer } from '../../config/ioc-container';

const UserService = IOCContainer.getInstance()
  .getContainer()
  .get<IUser>(APP_SERVICE_IDENTIFIER.USER);
const SecurityService = IOCContainer.getInstance()
  .getContainer()
  .get<ISecurity>(SERVICE_IDENTIFIER.SECURITY);
/**
 * User GraphQL resolver
 */
export default {
  Mutation: {
    login: async (parent, args, context, info) => {
      const email = args.email;
      const role = args.role ? args.role : 'USER';
      const userId = UserService.findUserIdForEmail(email);
      const RSA_PRIVATE_KEY = await SecurityService.getKey(JWT_KeyType.Private);
      const expiryTime =
        process.env.TOKEN_EXPIRY_TIME !== undefined
          ? process.env.TOKEN_EXPIRY_TIME
          : '1h';
      const jwtBearerToken = await jwt.sign(
        { role: role, email: email },
        RSA_PRIVATE_KEY,
        {
          algorithm: 'RS256',
          expiresIn: expiryTime,
          subject: userId
        }
      );
      const user: User = {
        email: email,
        id: userId,
        role: role,
        jwt: jwtBearerToken
      };
      context.user = Promise.resolve(user);
      return Promise.resolve(user);
    }
  }
};
