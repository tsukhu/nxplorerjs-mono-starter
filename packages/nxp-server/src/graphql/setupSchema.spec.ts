// Need to include the next line for Visual Studio Code
// intellisense to work for jest types
import { graphql } from 'graphql';

import '../env';
import { setupSchema } from './setupSchema';

describe('Example Service Tests', () => {
  it('should be returning a quote ', done => {
    const query = `
        query Q {
            quoteOfTheDay
        }
      `;
    const rootValue = {};
    graphql(setupSchema(), query, rootValue).then(result => {
      const { data } = result;
      expect(data.quoteOfTheDay).not.toHaveLength(0);
      done();
    });
  });

  it('should be returning a random number > 0 ', done => {
    const query = `
        query Q {
            random
        }
      `;
    const rootValue = {};
    graphql(setupSchema(), query, rootValue).then(result => {
      const { data } = result;
      expect(data.random).toBeGreaterThan(0);
      done();
    });
  });

});
