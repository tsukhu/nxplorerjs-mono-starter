import * as request from 'supertest';
import '../env';
import {
  ExpressServer,
  SERVICE_IDENTIFIER,
  ILogger,
  configHystrix
} from '@nxp/nxp-core';
import { IOCContainer } from '../config/ioc-container';
import * as path from 'path';

const container = IOCContainer.getInstance().getContainer();
const logger = container.get<ILogger>(SERVICE_IDENTIFIER.LOGGER);
const app = new ExpressServer(
  container,
  logger,
  path.join('./src/swagger', 'Api.yaml')
)
  .getServer()
  .build();

app.listen(process.env.PORT);

describe('nxplorerjs-microservice: routes spec', () => {
  it('should get 200 response from home page', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should get 200 response example', done => {
    request(app)
      .get('/api/v1/examples')
      .expect(200)
      .expect(res => {
        res.body =
          "[{'id': 0, 'name': 'example 0'}, {'id': 1, 'name': 'example 1'}]";
      })
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should get 404 from unknown route', done => {
    request(app)
      .get('/asodkoasd9923942ik3koadskoaksda9isd')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});
