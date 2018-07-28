import { IOCContainer } from '../../config/ioc-container';
import { APP_SERVICE_IDENTIFIER } from '../constants/identifiers';
import IExample from '../../api/interfaces/iexample';
import '../../env';

describe('Example Service Tests', () => {
  let exampleService: IExample;
  beforeEach(() => {
    const container = IOCContainer.getInstance().getContainer();
    exampleService = container.get<IExample>(APP_SERVICE_IDENTIFIER.EXAMPLE);
  });

  it('Get All elements in the example array', () => {
    return exampleService.all().then(result => {
      expect(result.length).toEqual(2);
    });
  });

  it('should return userId of 1 for byPostsByID call', done => {
    exampleService.byPostsByID(1).subscribe(result => {
      expect(result.data.userId).toEqual(1);
      done();
    });
  });

  it('POST Test', () => {
    const expectedName = 'Hello World';
    return exampleService.create(expectedName).then(result => {
      expect(result.name).toEqual(expectedName);
      return exampleService
        .byId(2)
        .then(data => expect(data.name).toEqual(expectedName));
    });
  });
});
