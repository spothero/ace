---
id: version-9.0.0-settings-browsersync
title: Browsersync
original_id: settings-browsersync
---

**key:** `browserSync`
When included, BrowserSync can watch for changes in files not associated with Webpack (such as stylesheets compiled by a Gulp task) and inject them into the browser.

## `prefix`
The prefix shown in shell when Browsersync events occur.

**default:**
`'Browsersync'`

## `port`
The port to run Browsersync on.

**default:**
`3000`

## `open`
Whether to automatically open a new browser window when Browsersync starts during development builds. Set to `'external'` if `hostname` isn't `'localhost'`.

**default:**
`true`

## `startPath`
An optional path to open the browser window at when Browsersync starts.
