---
id: version-8.0.0-upgrading-v8
title: 7.x.x to 8.x.x
original_id: upgrading-v8
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

The `server` script is used to start up the production node server and load the minified production server bundle.

### New Underlying SSR Dev Server
ACE previously used nodemon to fire up the server and restart it when changes were detected. This was not ideal and caused issues in page refreshes. We've now changed to using [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware), [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware), and [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware/) which allows more seamless integration with changes being made. HMR is also now (half) working, in that it does properly refresh the page on the client. We're still working out the kinks here on why the modules aren't being updated without a page refresh, but its heading in the right direction. HMR is a tricky thing to get right both on the server and the client, so bare with us.

The client dev server remains unchanged but may get updated in a future release to use the same setup.

### Uglification with Terser
The next major version of webpack will use [Terser](https://github.com/webpack-contrib/terser-webpack-plugin) instead of [UglifyJS](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) to minify JS. We've already made this switch under the hood to fix issues with ES6+ codebases.

## Breaking Changes
### Specify Extra Webpack Plugins
New settings in both `client` and `server` builds for each environment that allow passing of custom plugins to webpack. This is a breaking change because this property is required to exist in the *settings.js* file.

*settings.js*
```diff
webpack: {
    ...
    client: {
        development: {
            ...
+           plugins: [],
        },
        test: {
            ...
+           plugins: [],
        },
        production: {
            ...
+           plugins: [],
        },
    },
    ...
},
```

### New Per-Environment Webpack Server Options
Much like the client settings, the webpack server settings got additions per environment. These settings are required to exist in the settings file.

*settings.js*
```diff
webpack: {
    ...
    server: {
+       development: {
+           sourceMap: 'cheap-module-source-map',
+           writeToDisk: true,
+           plugins: [],
+       },
+       test: {
+           sourceMap: 'cheap-module-source-map',
+           plugins: [],
+       },
+       production: {
+           sourceMap: 'source-map',
+           plugins: [],
+       },
    },
    ...
},
```

These settings mirror their client counterparts for the server bundle.

### Required Environment Tasks
The tasks now require the `test` and `production` sequences to be defined, even if empty.

*tasks.js*
```diff
taskSequence: {
    ...
    server: {
        development: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
+       test: {
+           preBuild: [],
+           postBuild: [],
+           custom: []
+       },
+       production: {
+           preBuild: [],
+           postBuild: [],
+           custom: []
+       },
   },
}
```

While the `test` tasks are not currently used, they will help avoid a breaking change in the future.

### SSR Project Scaffolding
ACE no longer scaffolds an `index-ssr.html` file when starting a new project. The new scaffold creates a `server.js` file that has the index markup built into it for use on the server. See the [SSR guide](docs-ssr) for more details.

## Other
### No Production Linting
Previously, the `lintJS` and `lintSass` tasks ran even during a production build. This is unnecessary at this point in the pipeline as linting is mostly a development task. These tasks have been removed from production builds.
