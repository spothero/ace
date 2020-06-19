---
id: upgrading-v12
title: 11.x.x to 12.x.x
---

ACE v12 removes the Gulp Sentry tasks in favor of the Webpack plugin. This is another step towards removing Gulp from ACE entirely, which will allow us to eventually update the Node version used in our applications.

## Breaking Changes
### Removed Sentry Gulp Task and Task Configuration
Removed `sentry` Gulp task and replaced it with the official Sentry Webpack plugin. This uploads built files and sourcemaps directly to Sentry, instead of using S3 as an intermediary.

### Corresponding Application Changes
* Any `sentry` task used in `config/tasks.js` should be removed. As not all applications use Sentry, a new option (`deploy.uploadToSentry`) is made available in `config/settings.js`. Setting this to `true` will enable the use of the Webpack plugin.
* Sentry settings that were previously configured in `config/tasks.js` should be moved into a `.sentryclirc` file. See the [official Sentry documentation](https://docs.sentry.io/cli/configuration/#configuration-file) for more information.
