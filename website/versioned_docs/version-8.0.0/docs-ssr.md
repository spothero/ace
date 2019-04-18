---
id: version-8.0.0-docs-ssr
title: Server Side Rendering
original_id: docs-ssr
---

Server Side Rendering (SSR) support is built into ACE. You can initialize a project the same way as normal and follow the guide below to get started.

It's advisable to rename the package scripts accordingly. Because the non-SSR related scripts have no use in an SSR project, you can make the following changes in your *package.json* file:

```diff
- "start": "ACE_NPM_EVENT=start ace",
- "start:ssr": "ACE_NPM_EVENT=start ACE_ENVIRONMENT=server ace -- ssrDev",
- "build": "ACE_NPM_EVENT=build ace -- production",
- "build:ssr": "ACE_NPM_EVENT=build ACE_ENVIRONMENT=server ace -- ssrProduction",
+ "start": "ACE_NPM_EVENT=start ACE_ENVIRONMENT=server ace -- ssrDev",
+ "build": "ACE_NPM_EVENT=build ACE_ENVIRONMENT=server ace -- ssrProduction",
```

## Local Development
* You can safely remove the scaffolded *src/index.html* file as it is not used in an SSR setup. The *src/server.js* file is where the markup will be placed.
* Open *src/js/main.js* and remove the import of `{render}` and the actual `render` statement that's used in non-SSR setups.
* Uncomment the `{hydrate}` import and the `hydrate` statement at the bottom.
* Run `npm start` to begin local development.

## Production
The `build` task will output the client and server bundles, respectively. How your production setup is configured is entirely up to you and specific to your project, but the node server will have to be able to access the production ready server bundle. The bundle is output into the `dist` directory and the server command tries to read it from there.

* Run `npm run build` to generate the production ready files.
* Run `npm run server` on your production node instance to spin up the node server that delivers the production ready bundle.

Because every setup is different, it's hard to give solid advice on how to run this in your infrastructure. You can work with your ops team to configure this properly.

## Known Issues
1. Hot Module Replacement (HMR) on the client is half baked at the moment. The current behavior completely refreshes the page when a JS update is made. HRM on the server works as expected. Any help offered on this issue would be greatly appreciated.
