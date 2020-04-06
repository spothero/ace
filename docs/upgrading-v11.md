---
id: upgrading-v11
title: 10.x.x to 11.x.x
---

ACE v11 removes Gulp CSS/SCSS tasks in favor of Webpack counterparts. This represents a major step towards removing Gulp from ACE entirely, which will allow us to eventually update the Node version used in our applications.

## Breaking Changes
### Removed Gulp Tasks
Removed Gulp tasks `sass`, `cssManifest`, `lintSass`, and `cssMin`. Since `lintJs` had been removed in a prior update, with the removal of these CSS/SCSS Gulp tasks, there was no longer a need for the `watch` task which was removed as well.

### Webpack Changes and Corresponding Application Changes
New plugins and loaders were added to allow the Webpack client configuration to handle SCSS, CSS, and images:
* `sass-loader` (compiles SASS to CSS)
* `css-loader` (interprets @import and url())
* `file-loader` (handles images and SVGs which are now part of the dependency graph, due to css-loader)
* `postcss-loader` (handles autoprefixing and minification of CSS)
* `mini-css-extract-plugin` (extracts CSS files)
* `stylelint-webpack-plugin` (stylelint)

#### Output Directory
Because Webpack now outputs CSS and images (where previously it only output JS), the output directory has been changed to `${dist}`. Any configuration that previously assumed an output directory of `${dist}/${settingsConfig.src.js.path}` will need to be updated to explicitly include the JS path.

#### SASS Imports 
Update import statements in SASS files. See [Webpack sass-loader docs](https://webpack.js.org/loaders/sass-loader/#resolving-import-at-rules).

#### Stylelint Configuration Changes
Custom patterns for ignored files should be moved from an application's Gulp task config into the `.stylelintrc` file. 
