import { Container } from 'inversify';
import { createContainer } from '@nxp/nxp-core';
import { APP_SERVICE_IDENTIFIER } from '../api/constants/identifiers';
import { IStarwars } from '../api/interfaces';
import { StarwarsService } from '../api/services';

export class IOCContainer {
  public static getInstance() {
    if (!IOCContainer.instance) {
      IOCContainer.instance = new IOCContainer();
      const container = createContainer();

      // Define service bindings
      container
        .bind<IStarwars>(APP_SERVICE_IDENTIFIER.STARWARS)
        .to(StarwarsService);
      IOCContainer.instance.container = container;
    }
    return IOCContainer.instance;
  }

  private static instance: IOCContainer;
  private container: Container;
  private constructor() {}

  public getContainer(): Container {
    return this.container;
  }

  public setContainer(container: Container) {
    this.container = container;
  }
}
