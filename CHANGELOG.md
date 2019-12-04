# 10.0.6 - 12/04/2019

## Miscellaneous Updates
* [[94c7809](https://github.com/spothero/ace/commit/94c7809)] - `fix:` Downgrade terser to try and fix IE11 (Matt Przybylski)

# 10.0.5 - 12/04/2019

## Miscellaneous Updates
* [[f8ea8e2](https://github.com/spothero/ace/commit/f8ea8e2)] - `fix:` Roll back Babel updates to see if it fixes IE11 (Matt Przybylski)
* [[60d4b8d](https://github.com/spothero/ace/commit/60d4b8d)] - `fix:` Bump core-js package to latest to fix issues with Babel (Matt Przybylski)
* [[a349f70](https://github.com/spothero/ace/commit/a349f70)] - `docs:` Cleanup changelog (Matt Przybylski)

# 10.0.4 - 12/02/2019
## Miscellaneous Updates
* [[588be7e](https://github.com/spothero/ace/commit/588be7e)] - `chore:` Update to latest dependencies (Matt Przybylski)
* [[6044ea2](https://github.com/spothero/ace/commit/6044ea2)] - 10.0.3 (Matt Przybylski)

# 10.0.3 - 12/02/2019

## Miscellaneous Updates
* [[230d9f5](https://github.com/spothero/ace/commit/230d9f5)] - `style:` Run prettier on JS files (Matt Przybylski)
* [[572496d](https://github.com/spothero/ace/commit/572496d)] - `fix:` Use gulp-watch to avoid polling for changes ([#37](https://github.com/spothero/ace/pull/37)) (Tom Schroeder)

# 10.0.2 - 11/20/2019

## Miscellaneous Updates
* [[3fe883d](https://github.com/spothero/ace/commit/3fe883d)] - `fix:` Return exit code from forked Gulp process in order to handle errors externally (Tom Schroeder)

# 10.0.1 - 10/31/2019

## Miscellaneous Updates
* [[76dd0f8](https://github.com/spothero/ace/commit/76dd0f8)] - `fix:` Change generateSprites padding to be 4 instead of 5 for more rounded generated numbers (Matt Przybylski)

# 10.0.0 - 09/26/2019
## Breaking Changes
* [[cc3366d](https://github.com/spothero/ace/commit/cc3366d)] - Add Babel plugin to remove prop types during production builds ([#32](https://github.com/spothero/ace/pull/32)) (Matt Przybylski)

## Miscellaneous Updates
* [[2b2d043](https://github.com/spothero/ace/commit/2b2d043)] - `chore:` Update to latest dependencies (Matt Przybylski)
* [[35721f4](https://github.com/spothero/ace/commit/35721f4)] - `fix:` Babel config dev mode name to development and update specials docs (Matt Przybylski)

# 9.0.0 - 09/18/2019
## Breaking Changes
* [[869f266](https://github.com/spothero/ace/commit/869f266)] - Change publicPath for client production deployments to include leading slash (Rose Bui)

## New Features
* [[e378c31](https://github.com/spothero/ace/commit/e378c31)] - Enable opt-out of browserSync ([#31](https://github.com/spothero/ace/pull/31)) (Rose Bui)

## Miscellaneous Updates
* [[7b48b0e](https://github.com/spothero/ace/commit/7b48b0e)] - `docs:` Update setup command to use npx (Matt Przybylski)

# 8.5.2 - 09/10/2019

## Miscellaneous Updates
* [[29cb9df](https://github.com/spothero/ace/commit/29cb9df)] - `fix:` Remove size-plugin because its not really useful and we have bundle analyzer in place (Matt Przybylski)

# 8.5.1 - 09/04/2019

## Miscellaneous Updates
* [[f5a93d8](https://github.com/spothero/ace/commit/f5a93d8)] - `fix:` Only include react-hot-loader in dev environment (Matt Przybylski)

# 8.5.0 - 09/04/2019
## New Features
* [[8b67c7e](https://github.com/spothero/ace/commit/8b67c7e)] - Prettier integration and dependency updates ([#30](https://github.com/spothero/ace/pull/30)) (Matt Przybylski)
	* `feat:` Add support for Prettier and update dependencies to latest
	* `fix:` Change peerDependencies to be a range rather than pinned version
	* `fix:` Reorganize spothero related source files and update npmignore

# 8.4.5 - 08/01/2019

## Miscellaneous Updates
* [[1f920a2](https://github.com/spothero/ace/commit/1f920a2)] - `fix:` Issue where production server config was running in development mode causing memory leaks ([#29](https://github.com/spothero/ace/pull/29)) (Matt Przybylski)

# 8.4.4 - 07/17/2019

## Miscellaneous Updates
* [[c06c42c](https://github.com/spothero/ace/commit/c06c42c)] - `fix:` Add @babel/plugin-proposal-object-rest-spread to dependencies and babel (Matt Przybylski)

# 8.4.3 - 07/17/2019

## Miscellaneous Updates
* [[624a7fc](https://github.com/spothero/ace/commit/624a7fc)] - `chore:` Update to latest deps (Matt Przybylski)
* [[7e58321](https://github.com/spothero/ace/commit/7e58321)] - `fix:` Correctly add server bundle to test files (Matt Przybylski)

# 8.4.2 - 07/17/2019

## Miscellaneous Updates
* [[0b551a4](https://github.com/spothero/ace/commit/0b551a4)] - `fix:` Run the correct configuration merging for SSR test task (Matt Przybylski)

# 8.4.1 - 07/17/2019

## Miscellaneous Updates
* [[606fd85](https://github.com/spothero/ace/commit/606fd85)] - `fix:` Actually add the test command for SSR, doh (Matt Przybylski)

# 8.4.0 - 07/17/2019
## New Features
* [[3664862](https://github.com/spothero/ace/commit/3664862)] - Add testing support for SSR (Matt Przybylski)

# 8.3.2 - 07/05/2019

## Miscellaneous Updates
* [[47d5bfe](https://github.com/spothero/ace/commit/47d5bfe)] - `fix:` Update @spothero/eslint-config to fix false positives (Matt Przybylski)

# 8.3.1 - 07/05/2019

## Miscellaneous Updates
* [[065cebe](https://github.com/spothero/ace/commit/065cebe)] - `fix:` Update eslint config to fix underlying issues in those deps (Matt Przybylski)
* [[d67cb9d](https://github.com/spothero/ace/commit/d67cb9d)] - `fix:` Autoprefixer upgrade changed browsers entry in sass task (Matt Przybylski)

# 8.3.0 - 07/05/2019
## New Features
* [[607eaeb](https://github.com/spothero/ace/commit/607eaeb)] - Enable passing options to htmlWebpackPlugin for use in template ([#28](https://github.com/spothero/ace/pull/28)) (Rose Bui)
	* `feat:` Enable passing options to htmlWebpackPlugin for use in template
	* `docs:` Document injectOptions
	* `feat:` Display new option in base settings template

## Miscellaneous Updates
* [[9f4e846](https://github.com/spothero/ace/commit/9f4e846)] - `chore:` Update to latest Babel dependencies (Matt Przybylski)
* [[1c8b664](https://github.com/spothero/ace/commit/1c8b664)] - `chore:` Update all non-Babel dependencies to latest (Matt Przybylski)

# 8.2.0 - 06/21/2019
## New Features
* [[ec96c4d](https://github.com/spothero/ace/commit/ec96c4d)] - SSR JS Bundling Updates ([#27](https://github.com/spothero/ace/pull/27)) (Matt Przybylski)
	* `feat:` Add minify option for SSR production bundles and set it to false by default
	* `refactor:` Default to not creating sourcemaps for all SSR environments

## Miscellaneous Updates
* [[263531e](https://github.com/spothero/ace/commit/263531e)] - `docs:` Update Docusaurus to get rid of security vulnerability (Matt Przybylski)

# 8.1.2 - 05/15/2019

## Miscellaneous Updates
* [[34addf0](https://github.com/spothero/ace/commit/34addf0)] - `fix:` Flags in dev-server always coming back defined (Matt Przybylski)

# 8.1.1 - 05/15/2019

## Miscellaneous Updates
* [[9ced596](https://github.com/spothero/ace/commit/9ced596)] - `fix:` Adjust new server flags to add proper spacing when defined (Matt Przybylski)

# 8.1.0 - 05/15/2019
## New Features
* [[b2e6b77](https://github.com/spothero/ace/commit/b2e6b77)] - Add the ability to pass flags to node servers in SSR mode (Matt Przybylski)

# 8.0.4 - 05/13/2019

## Miscellaneous Updates
* [[9293124](https://github.com/spothero/ace/commit/9293124)] - `chore:` Update to latest dependencies, most notably for ESLint and Stylelint config updates (Matt Przybylski)

# 8.0.3 - 05/10/2019

## Miscellaneous Updates
* [[fbf6cc5](https://github.com/spothero/ace/commit/fbf6cc5)] - `fix:` IE11 broken in production mode by errant react-hot-loader config entry (Matt Przybylski)

# 8.0.2 - 04/26/2019
## Miscellaneous Updates
* [[affdcf8](https://github.com/spothero/ace/commit/affdcf8)] - `fix:` Add errorhandler middleware to SSR dev server (Matt Przybylski)
* [[f2e5abd](https://github.com/spothero/ace/commit/f2e5abd)] - Move codeowners to .github ([#24](https://github.com/spothero/ace/pull/24)) (boiarqin)

# 8.0.1 - 04/19/2019

## Miscellaneous Updates
* [[275968c](https://github.com/spothero/ace/commit/275968c)] - `fix:` Environment variables not being set in client and server builds correctly (Matt Przybylski)

# 8.0.0 - 04/18/2019
## Breaking Changes
* [[7e8cbb2](https://github.com/spothero/ace/commit/7e8cbb2)] - ACE v8 ([#23](https://github.com/spothero/ace/pull/23)) (Matt Przybylski)
	* `breaking:` Add new SSR dev server setup
	* `feat:` Support SSR in production server environments
	* `feat:` Add support for specifying custom webpack plugins in settings
	* `docs:` Update docs for v8 upgrade guide

## Miscellaneous Updates
* [[50513ac](https://github.com/spothero/ace/commit/50513ac)] - `chore:` Update package-lock to latest (Matt Przybylski)

# 7.0.0 - 04/08/2019
## Breaking Changes
* [[8a3cde7](https://github.com/spothero/ace/commit/8a3cde7)] - v7: core-js Upgrades ([#22](https://github.com/spothero/ace/pull/22)) (Matt Przybylski)
	* `breaking:` Upgrade dependencies and corejs@3, see migration in docs for details.
	* `docs:` Add upgrade guide for v7

## Miscellaneous Updates
* [[563ae1b](https://github.com/spothero/ace/commit/563ae1b)] - `docs:` Create CODEOWNERS ([#21](https://github.com/spothero/ace/pull/21)) (Rose Bui)

# 6.0.3 - 03/04/2019

## Miscellaneous Updates
* [[e7d6b28](https://github.com/spothero/ace/commit/e7d6b28)] - `docs:` Upgrade to latest Docusaurus version (Matt Przybylski)

# 6.0.2 - 03/04/2019

## Miscellaneous Updates
* [[4e3dbd7](https://github.com/spothero/ace/commit/4e3dbd7)] - `fix:` Refactor invalidateCloudfront to spawn tasks for each distro invalidation in order to fix the `task completion callback called too many times` error (Zachary Wagner)

# 6.0.1 - 03/01/2019

## Miscellaneous Updates
* [[ca1cb53](https://github.com/spothero/ace/commit/ca1cb53)] - `chore:` Update to latest deps (Matt Przybylski)

# 6.0.0 - 01/08/2019
## Breaking Changes
* [[5c86d3d](https://github.com/spothero/ace/commit/5c86d3d)] - v6 - SSR Improvements ([#17](https://github.com/spothero/ace/pull/17)) (Matt Przybylski)
	* `breaking:` Upgrades for v6 SSR, see Changelog
	* `chore:` Updated to latest dependencies
	* `feat:` Upgrade to latest react-hot-loader including newest hot syntax

## Miscellaneous Updates
* [[27c3102](https://github.com/spothero/ace/commit/27c3102)] - `refactor:` Add wait-on to ssr dev task to avoid errors on first run (Matt Przybylski)
* [[3b24270](https://github.com/spothero/ace/commit/3b24270)] - `docs:` Updated to latest Docusaurus again (Matt Przybylski)

# 5.2.2 - 12/07/2018

## Miscellaneous Updates
* [[eda957d](https://github.com/spothero/ace/commit/eda957d)] - `fix:` Move ACE_DEPLOY_TYPE env vars to proper spot in package scripts so they get picked up correctly in deploy task (Matt Przybylski)
* [[123cb3b](https://github.com/spothero/ace/commit/123cb3b)] - `docs:` Upgraded Docusaurus to latest version (Matt Przybylski)

# 5.2.1 - 12/07/2018

## Miscellaneous Updates
* [[94e362f](https://github.com/spothero/ace/commit/94e362f)] - `fix:` Sentry task was no longer uploading correct file based on new manifest generation patterns (Matt Przybylski)
* [[f8580fe](https://github.com/spothero/ace/commit/f8580fe)] - `docs:` Update default tasks example (Matt Przybylski)

# 5.2.0 - 12/06/2018
## New Features
* [[56da708](https://github.com/spothero/ace/commit/56da708)] - Add CSS filename key/value pairs to the manifest during development builds (Matt Przybylski)

# 5.1.2 - 12/06/2018

## Miscellaneous Updates
* [[9fe173c](https://github.com/spothero/ace/commit/9fe173c)] - `fix:` Embarassing amount of errors in the new injectAssets option internally, forgive us (Matt Przybylski)

# 5.1.1 - 12/06/2018

## Miscellaneous Updates
* [[cf1406b](https://github.com/spothero/ace/commit/cf1406b)] - `fix:` Incorrectly accessing the new injectAssets setting in webpack configs (Matt Przybylski)

# 5.1.0 - 12/06/2018
## New Features
* [[37c6dab](https://github.com/spothero/ace/commit/37c6dab)] - Added ability to control asset injection into HTML templates in settings (Matt Przybylski)

## Miscellaneous Updates
* [[7cbeed0](https://github.com/spothero/ace/commit/7cbeed0)] - `chore:` License under Apache 2.0 instead of MIT (Matt Przybylski)
* [[a21a69a](https://github.com/spothero/ace/commit/a21a69a)] - `docs:` Updated upgrading guide to best reflect index.html changes (Matt Przybylski)
* [[e305aa9](https://github.com/spothero/ace/commit/e305aa9)] - `ci:` Add docs to .npmignore (Matt Przybylski)

# 5.0.2 - 12/04/2018

## Miscellaneous Updates
* [[27872b8](https://github.com/spothero/ace/commit/27872b8)] - `fix:` Public path in webpack not being set correctly based on build environment (Matt Przybylski)
* [[ea3d655](https://github.com/spothero/ace/commit/ea3d655)] - `fix:` Run the Gulp callback function after invalidation in deploy task (Matt Przybylski)

# 5.0.1 - 12/03/2018

## Miscellaneous Updates
* [[92e63fe](https://github.com/spothero/ace/commit/92e63fe)] - `chore:` Bump to latest dependencies (Matt Przybylski)
* [[244ebd6](https://github.com/spothero/ace/commit/244ebd6)] - `fix:` Default runtimeChunk setting should be false (Matt Przybylski)

# 5.0.0 - 12/03/2018
## Breaking Changes
* [[04e61ed](https://github.com/spothero/ace/commit/04e61ed)] - Version 5 ([#15](https://github.com/spothero/ace/pull/15)) (Matt Przybylski)
	* `breaking:` See the upgrade guide (https://spothero.com/uniform/ace/docs/upgrading-v5/) for full details of this release.

# 4.4.0 - 11/27/2018
## Dependency Updates
* [[a8e193f](https://github.com/spothero/ace/commit/a8e193f)] - Update gulp-s3-upload dependency to remove its flatmap-stream dependency (Zachary Wagner)

# 4.3.4 - 11/06/2018

## Miscellaneous Updates
* [[a1acc39](https://github.com/spothero/ace/commit/a1acc39)] - `ci:` Add process titles to test and server tasks (Matt Przybylski)

# 4.3.3 - 11/06/2018

## Miscellaneous Updates
* [[d7b8443](https://github.com/spothero/ace/commit/d7b8443)] - `fix:` Bug with webpack-dev-server not serving routes properly in SPAs (Matt Przybylski)

# 4.3.2 - 11/06/2018

## Miscellaneous Updates
* [[481320e](https://github.com/spothero/ace/commit/481320e)] - `refactor:` Remove deprecated webpack-serve in favor of using webpack-dev-server (Matt Przybylski)

# 4.3.1 - 11/05/2018

## Miscellaneous Updates
* [[6e31b72](https://github.com/spothero/ace/commit/6e31b72)] - `chore:` Upgrade to latest dependencies for everything (Matt Przybylski)
* [[ff9dcf5](https://github.com/spothero/ace/commit/ff9dcf5)] - `chore:` Upgrade to latest dependencies for everything except React (Matt Przybylski)

# 4.3.0 - 10/15/2018
## Dependency Updates
* [[ca0e83f](https://github.com/spothero/ace/commit/ca0e83f)] - Updated most dependencies to latest versions (Matt Przybylski)

# 4.2.3 - 10/05/2018

## Miscellaneous Updates
* [[128f139](https://github.com/spothero/ace/commit/128f139)] - `chore:` Updated npmignore file (Matt Przybylski)

# 4.2.2 - 10/04/2018

## Miscellaneous Updates
* [[158136c](https://github.com/spothero/ace/commit/158136c)] - `fix:` Revert allowing empty deploy path as Cloudfront does not like that (Matt Przybylski)

# 4.2.1 - 10/03/2018

## Miscellaneous Updates
* [[d60ded9](https://github.com/spothero/ace/commit/d60ded9)] - `fix:` Temporary solution to Terser bug during Webpack production builds (Matt Przybylski)
* [[de133db](https://github.com/spothero/ace/commit/de133db)] - `fix:` Allow empty deploy paths to not break builds (Matt Przybylski)

# 4.2.0 - 10/03/2018
## New Features
* [[f9518f4](https://github.com/spothero/ace/commit/f9518f4)] - Added ability to invalidate multiple Cloudfront distributions during a deploy (Matt Przybylski)

## Miscellaneous Updates
* [[1faff25](https://github.com/spothero/ace/commit/1faff25)] - `docs:` Updated SpotHero README in scaffolded files (Matt Przybylski)
* [[466271c](https://github.com/spothero/ace/commit/466271c)] - `fix:` Updated SpotHero Sass import path (Matt Przybylski)

# 4.1.3 - 09/26/2018

## Miscellaneous Updates
* [[bd6c324](https://github.com/spothero/ace/commit/bd6c324)] - `chore:` Update @spothero/eslint-config to latest to avoid false positives (Matt Przybylski)

# 4.1.2 - 09/25/2018

## Miscellaneous Updates
* [[20c2290](https://github.com/spothero/ace/commit/20c2290)] - `fix:` Update @spothero/eslint-config to fix underlying errors from eslint upgrade (Matt Przybylski)

# 4.1.1 - 09/25/2018

## Miscellaneous Updates
* [[72ed4c8](https://github.com/spothero/ace/commit/72ed4c8)] - `chore:` Push @spothero/fe-ui dependency to latest (Matt Przybylski)

# 4.1.0 - 09/25/2018
## Dependency Updates
* [[a2c73af](https://github.com/spothero/ace/commit/a2c73af)] - Updated @spothero dependencies to latest, bump a few other minor, non-React, versions (Matt Przybylski)

# 4.0.0 - 09/19/2018
## Breaking Changes
* [[033621d](https://github.com/spothero/ace/commit/033621d)] - Babel 7 and React 16.4.2 ([#7](https://github.com/spothero/ace/pull/7)) (Matt Przybylski)
	* `upgrade:` Dependency upgrades in preparation for Babel 7, React upgraded to 16.4.2
	* `breaking:` Upgrade to Babel 7. Update `babel-polyfill` import statement path to `@babel/polyfill`.

# 3.3.2 - 08/28/2018

## Miscellaneous Updates
* [[2601b47](https://github.com/spothero/ace/commit/2601b47)] - `build:` Update to using newest npm-publisher for publishing to proper npm registry (Matt Przybylski)

# 3.3.1 - 08/23/2018

## Miscellaneous Updates
* [[a6e65d2](https://github.com/spothero/ace/commit/a6e65d2)] - `chore:` Updated a few dependencies, most notably Cypress, to fix internal bugs (Matt Przybylski)

# 3.3.0 - 08/23/2018
## New Features
* [[f92945f](https://github.com/spothero/ace/commit/f92945f)] - Added ability to pass moduleRules to webpack common config (Matt Przybylski)

## Miscellaneous Updates
* [[e2995c9](https://github.com/spothero/ace/commit/e2995c9)] - `docs:` Fix typo in settings.js documentation (Brett Kellgren)
* [[a7a0475](https://github.com/spothero/ace/commit/a7a0475)] - `chore:` Added a pull request template to SpotHero scaffolding setup (Matt Przybylski)

# 3.2.0 - 08/13/2018
## New Features
* [[8c3e6fa](https://github.com/spothero/ace/commit/8c3e6fa)] - Implement SpotHero employee only features back into ACE for internal SpotHero use (Matt Przybylski)

# 3.1.2 - 08/13/2018

## Miscellaneous Updates
* [[67b87bd](https://github.com/spothero/ace/commit/67b87bd)] - `fix:` Upgrading to latest ACE caused issues with old versions due to custom task checker (Matt Przybylski)

# 3.1.1 - 08/12/2018

## Miscellaneous Updates
* [[ddcba7d](https://github.com/spothero/ace/commit/ddcba7d)] - `fix:` Incorrect path to authToken in sentry task (Matt Przybylski)

# 3.1.0 - 08/12/2018
## New Features
* [[02562f6](https://github.com/spothero/ace/commit/02562f6)] - Add ability to pass custom task array to taskSequence (Matt Przybylski)

## Miscellaneous Updates
* [[399123c](https://github.com/spothero/ace/commit/399123c)] - `fix:` Remove requirement for staticUrl and path to be set in deploy settings for Sentry task deploys (Matt Przybylski)
* [[05ea545](https://github.com/spothero/ace/commit/05ea545)] - `docs:` Update sprite documentation (Matt Przybylski)

# 3.0.2 - 08/11/2018

## Miscellaneous Updates
* [[2bde36c](https://github.com/spothero/ace/commit/2bde36c)] - `fix:` Accidentally ignored all .eslintrc and .nvmrc files but we want the scaffolded ones to still be published (Matt Przybylski)

# 3.0.1 - 08/11/2018

## Miscellaneous Updates
* [[0879b73](https://github.com/spothero/ace/commit/0879b73)] - `docs:` Cleanup before publish (Matt Przybylski)
* [[31f4635](https://github.com/spothero/ace/commit/31f4635)] - `docs:` Updated README and CONTRIBUTING documentation (Matt Przybylski)
* [[b0c1f33](https://github.com/spothero/ace/commit/b0c1f33)] - `docs:` Updated README to add credits (Matt Przybylski)
* [[f10a1ba](https://github.com/spothero/ace/commit/f10a1ba)] - `docs:` Small tweak to README (Matt Przybylski)
* [[b4d12b1](https://github.com/spothero/ace/commit/b4d12b1)] - `fix:` Denying during scaffolding causing task sequence to die (Matt Przybylski)
* [[35f7f04](https://github.com/spothero/ace/commit/35f7f04)] - `build:` Move ACE to a public repository for open source (Matt Przybylski)
