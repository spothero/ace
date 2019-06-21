---
id: version-8.2.0-settings-webpack
title: Webpack
original_id: settings-webpack
---

**key:** `webpack`

## `client`
Webpack settings for clientside builds.

### `port`
The port for webpack to run on.

**default:**
`9000`

### `entry`
A string or object which sets the entry point for JS file(s) passed to webpack. Path(s) start after `src.js.path`.

**default:**
`'main.js'`

### `chunkFilename`
Determines the name of non-entry chunk files. [Additional documentation](https://webpack.js.org/configuration/output/#output-chunkfilename).

**default:**
`'[name]-[chunkhash].js'`

### `output`
The name of the generated output JS file(s).

**default:**
`'[name]-[hash].js'`

### `injectAssets`
Whether to inject all assets into the given HTML template. If this is set to false, it will be your responsibility to make sure that you load the assets correctly. [Additional documentation](https://github.com/jantimon/html-webpack-plugin#options).

**default:**
`true`

### `alias`
An object to create aliases to `import` certain modules more easily. [Additional documentation](https://webpack.js.org/configuration/resolve/#resolve-alias).

### `resolveModules`
Additional paths to resolve modules from. Path(s) start after the `root.path` setting.

### `moduleRules`
Additional rules to pass to webpack. [Additional documentation](https://webpack.js.org/configuration/module/#module-rules).

### `externals`
Exclude dependencies from the output bundle(s). [Additional documentation](https://webpack.js.org/configuration/externals).

### `clientLogLevel`
How to show messages in DevTools when using inline mode in dev server. [Additional documentation](https://webpack.js.org/configuration/dev-server/#devserver-clientloglevel).

**default:**
`'none'`

### `optimization`
Available optimization overrides.

#### `runtimeChunk`
Controls how the runtime is embedded in chunks. [Additional documentation](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk).

**default:**
`false`

#### `splitChunks`
Configures chunk splitting. This is a direct passthrough to webpack to allow for the most flexibility. [Additional documentation](https://webpack.js.org/configuration/optimization/#optimization-splitchunks).

The following would create a separate `vendor` bundle from all `node_modules`.
```js
optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {
                name: 'vendor',
                test: /node_modules/,
                chunks: 'all',
            }
        }
    },
}
```

### `development`
Options that are added during a development build.

#### `historyApiFallback`
Adds support for falling back to `index.html` in case the requested resource at a given URL can't be found. [Additional documentation](https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback).

**default:**
`true`

#### `proxy`
Passes proxy information through to webpack server. [Additional documentation](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

```js
development: {
    proxy: {
        '/api/v1': `http://${hostname}:8000`
    }
}
```

#### `sourceMap`
The source map type to use during development.

**default:**
`'cheap-module-source-map'`

#### `writeToDisk`
Whether to write the bundled files to disk. This can be very useful for debugging or usage in a tool like [Charles](https://www.charlesproxy.com/) to map local files to a remote location.

**default:**
`true`

#### `analyze`
Pass an options object to enable bundle analyzation using [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

#### `plugins`
An array of [extra plugins](https://webpack.js.org/configuration/plugins) to add to the development build.

### `test`
Options that are added during a test build.

#### `useBrowserSync`
Use Browsersync during tests for CSS injection.

**default:**
`true`

#### `browserSyncOpen`
Open the browser window when Browsersync starts during tests. Same possible settings as [`browserSync.open`](settings-browsersync#open).

**default:**
`false`

#### `sourceMap`
The source map type to use during testing.

**default:**
`'cheap-module-source-map'`

#### `plugins`
An array of [extra plugins](https://webpack.js.org/configuration/plugins) to add to the test build.

### `production`
Options that are added during a production build.

#### `sourceMap`
The source map type to use during production.

**default:**
`'source-map'`

#### `analyze`
Pass an options object to enable bundle analyzation using [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

**default:**
```js
analyze: {
    generateStatsFile: true,
    analyzerMode: 'static',
    openAnalyzer: false,
}
```

#### `plugins`
An array of [extra plugins](https://webpack.js.org/configuration/plugins) to add to the production build.

## `server`
Webpack settings for serverside builds.

### `port`
The port for webpack to run on.

**default:**
`9000`

### `entry`
A string which sets the entry point JS file passed to webpack for the server. Path starts after `src.path`.

**default:**
`'server.js'`

### `output`
The name of the generated output JS file.

**default:**
`'server.bundle.js'`

### `alias`
An object to create aliases to `import` certain modules more easily. [Additional documentation](https://webpack.js.org/configuration/resolve/#resolve-alias).

### `resolveModules`
Additional paths to resolve modules from. Path(s) start after the `root.path` setting.

### `moduleRules`
Additional rules to pass to webpack. [Additional documentation](https://webpack.js.org/configuration/module/#module-rules).

### `externals`
Exclude dependencies from the output bundle. [Additional documentation](https://webpack.js.org/configuration/externals).

**IMPORTANT: Setting this will override default of `nodeExternals()`.**

### `development`
Options that are added during a development build.

#### `sourceMap`
The source map type to use during development.

**default:**
`false`

#### `writeToDisk`
Whether to write the bundled files to disk. This can be very useful for debugging.

**default:**
`true`

#### `plugins`
An array of [extra plugins](https://webpack.js.org/configuration/plugins) to add to the development build.

#### `flags`
A string signifying the [flags](https://nodejs.org/de/docs/guides/debugging-getting-started/#command-line-options) to pass to the node development server exactly as they should be passed through.

### `test`
Options that are added during a test build.

#### `sourceMap`
The source map type to use during testing.

**default:**
`false`

#### `plugins`
An array of [extra plugins](https://webpack.js.org/configuration/plugins) to add to the test build.

#### `flags`
A string signifying the [flags](https://nodejs.org/de/docs/guides/debugging-getting-started/#command-line-options) to pass to the node test server exactly as they should be passed through.

### `production`
Options that are added during a production build.

#### `sourceMap`
The source map type to use during production.

**default:**
`false`

#### `plugins`
An array of [extra plugins](https://webpack.js.org/configuration/plugins) to add to the production build.

#### `flags`
A string signifying the [flags](https://nodejs.org/de/docs/guides/debugging-getting-started/#command-line-options) to pass to the node production server exactly as they should be passed through.

#### `minify`
Whether to minify the production server bundle or not. The server bundle is usually not visible to the end user so it does not need to be minified. This may also help in debugging through tools like Sentry.

**default:**
`false`
