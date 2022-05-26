## What's inside?

[Turborepo](https://turborepo.org/) project containing personal portfolio and future projects.

### Packages

- `config`: `eslint` configurations (includes `eslint-config-next`,`eslint-plugin-prettier` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Sites

- [bachitter.dev](https://bachitter.dev)
  - [x] Add Better Navigation
  - [ ] Add Comments

Check Status at [https://status.bachitterch.com](https://status.bachitterch.com)

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Github Actions](https://github.com/features/actions) for CI/CD

## Setup

`cd source-code`

This repository is uses (PNPM) as package manager, run `pnpm i` to install the dependencies.

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd source-code
pnpm run dev
```

[![Vercel](https://img.shields.io/badge/-powered%20by%20vercel-black.svg?logo=vercel&longCache=true&style=for-the-badge)](https://vercel.com/home?utm_source=nuro&utm_campaign=oss)
