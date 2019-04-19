---
id: settings-environment
title: Environment
---

**key:** `env`

## `hostname`
The hostname that the browser initializes with during development.

**default:**
`localhost`

## `vars`
Environment variables as key/value pairs to pass to each webpack config for use in client and server Javascript code. These use [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) under the hood and all rules of it apply.

**example:**
`{API_URL: JSON.stringify('/api/v1')}`

### `common`
Common variables that will be passed to every webpack config.

### `development`
Common variables that will be passed to the development webpack config.

**preset:**
`NODE_ENV: JSON.stringify('development')`

### `test`
Common variables that will be passed to the test webpack config.

**preset:**
`NODE_ENV: JSON.stringify('development')`

### `production`
Common variables that will be passed to the production webpack config.

**preset:**
`NODE_ENV: JSON.stringify('production')`
