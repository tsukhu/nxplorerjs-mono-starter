import IUser from '../../api/interfaces/iuser';
import { IOCContainer } from '../../config/ioc-container';
import { APP_SERVICE_IDENTIFIER } from '../constants/identifiers';
import '../../env';

describe('User Service Tests', () => {
  let userService: IUser;

  beforeAll(() => {
    const container = IOCContainer.getInstance().getContainer();
    userService = container.get<IUser>(APP_SERVICE_IDENTIFIER.USER);
  });

  it('returns true for valid email and password', () => {
    const result = userService.validateEmailAndPassword(
      'test@email.com',
      'password'
    );
    expect(result).toEqual(true);
  });

  it('returns true for valid email and password', () => {
    const result = userService.findUserIdForEmail('test@email.com');
    expect(result.length).toBeGreaterThan(2);
  });
});
