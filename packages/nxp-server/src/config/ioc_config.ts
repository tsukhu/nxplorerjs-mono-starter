import { createContainer, SERVICE_IDENTIFIER } from '@nxp/nxp-core';
import { Container } from 'inversify';
import { APP_SERVICE_IDENTIFIER } from '../api/constants/identifiers';
import '../api/controllers/examples/controller';
import '../api/controllers/hystrix-demo/controller';
import '../api/controllers/security/controller';
import '../api/controllers/shop/controller';
import '../api/controllers/starwars/controller';
import {
  IExample,
  IHystrixDemo,
  IProduct,
  IStarwars,
  IUser
} from '../api/interfaces';
import {
  ExamplesService,
  HystrixDemoService,
  ProductService,
  StarwarsService,
  UserService
} from '../api/services';

// Initialize the container
export const setupContainer = (): Container => {
  const container = createContainer();

  // Define service bindings
  container.bind<IExample>(APP_SERVICE_IDENTIFIER.EXAMPLE).to(ExamplesService);
  container
    .bind<IHystrixDemo>(SERVICE_IDENTIFIER.HYSTRIX)
    .to(HystrixDemoService);
  container.bind<IProduct>(APP_SERVICE_IDENTIFIER.PRODUCT).to(ProductService);
  container
    .bind<IStarwars>(APP_SERVICE_IDENTIFIER.STARWARS)
    .to(StarwarsService);
  container.bind<IUser>(APP_SERVICE_IDENTIFIER.USER).to(UserService);
  return container;
};
