# nxplorerjs-mono-starter

[![Build Status](https://travis-ci.org/ERS-HCL/nxplorerjs-mono-starter.svg?branch=master)](https://travis-ci.org/ERS-HCL/nxplorerjs-mono-starter)

This is a mono repo version of the [nxplorer js microservice project](https://github.com/ERS-HCL/nxplorerjs-microservice-starter)

## Workspaces

- @nxp/nxp-core (Core Platform)
  - The platform module which does all the configuration and setup of the server express server and GraphQL server
  - It also configures the platform components like logging, monitoring, security , IOC container
- @nxp/nxp-server (Application)
  - This depends on @nxp/nxp-core for all the platform requirements
  - Sets up the REST APIS, Application Services and GraphQL business API implementation

## Setup

- Execute these commands from the root directory

### Installation

```bash
yarn bootstrap
```

- Production build

```bash
yarn prepare
```

- Development mode

```bash
yarn start
```

- Unit Tests

```bash
yarn test
```

- Integration Tests

```bash
yarn itest
```

- Lint

```bash
yarn lint
```

- Serve production build
- You need to first

```bash
yarn serve
```

## Adding new dependencies to workspaces

```bash
yarn workspace <workspace name> add <package>
```

- Example of adding node-fetch to @nxp/nxp-server

```bash
yarn workspace @nxp/nxp-server add node-fetch
```
