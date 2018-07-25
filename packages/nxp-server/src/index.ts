// import { ExpressServer } from '@nxp/nxp-core';
import './env';

export function cli() {
  // const server: ExpressServer = new ExpressServer;
  console.log('hello');
  return Promise.resolve(true);
}

cli();
