import * as compression from 'compression';
import { Application } from 'express';

/**
 * Add Compression Middleware , this will compress all requests
 * except those where the `x-no-compression` header is set.
 * @param app Express App
 */
export const addCompression = (app: Application) => {
  app.use(compression({ filter: shouldCompress }));
};

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};
