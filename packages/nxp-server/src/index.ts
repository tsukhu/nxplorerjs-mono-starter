import { createContainer } from '@nxp/nxp-core';

export function cli() {
  createContainer();
  return Promise.resolve(true);
}
