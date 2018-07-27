import { request } from 'graphql-request';
import { IOCContainer } from '../../config/ioc-container';

import { SERVICE_IDENTIFIER, ILogger } from '@nxp/nxp-core';

const LOG = IOCContainer.getInstance()
  .getContainer()
  .get<ILogger>(SERVICE_IDENTIFIER.LOGGER);

const query = `{
  Movie(title: "Inception") {
    releaseDate
    slug
    actors {
      name
    }
  }
}`;

/**
 * Movie GraphQL resolver
 */
export default {
  Query: {
    movie: (parent, args, context, info) => {
      return Promise.resolve(
        request(`${process.env.GRAPH_COOL_API_BASE_URL}/movies`, query).then(
          (data: any) => {
            LOG.info(data.Movie);
            return data.Movie;
          }
        )
      );
    }
  }
};
