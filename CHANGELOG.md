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
