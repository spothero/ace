---
id: upgrading-v8
title: 7.x.x to 8.x.x
---

ACE v8 is centered around updating SSR for a production ready build.

## New Features
### SSR Production Package Scripts
Two new package scripts exist for production SSR support.

```diff
"build:ssr": "ACE_NPM_EVENT=build ACE_ENVIRONMENT=server ace -- ssrProduction",
"server": "ACE_NPM_EVENT=server ace -- serverSSR",
```

The `build:ssr` script should be used to create production ready asset bundles for **BOTH** client and server code.

The `server` script is used to start up the production node server and load the production server bundle.

## Breaking Changes
### CoreJS@3
The newest version of Babel deprecates `@babel/polyfill` when used with `core-js` >= 3. To support this change, do the following:

#### Update Dependencies
```
npm uninstall @babel/polyfill
npm install -S core-js regenerator-runtime
```

#### Update Entry Point
In your `main.js` (or other entry point files), change the following imports:

```diff
- import '@babel/polyfill';
+ import 'core-js/stable';
+ import 'regenerator-runtime/runtime';
```

You should be all set from here.

## Other
### No Production Linting
Previously, the `lintJS` and `lintSass` tasks ran even during a production build. This is unnecessary at this point in the pipeline as linting is mostly a development task. These tasks have been removed from production builds.
