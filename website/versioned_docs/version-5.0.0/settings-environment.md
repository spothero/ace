---
id: version-5.0.0-settings-environment
title: Environment
original_id: settings-environment
---

**key:** `env`

## `hostname`
The hostname that the browser initializes with during development.

**default:**
`localhost`

## `vars`
Environment variables as key/value pairs to pass to each webpack config for use in clientside Javascript code.

**example:**
`{API_URL: '/api/v1'}`

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
