---
id: docs-home
title: What is ACE?
---

The Application Configuration Extractor (ACE for short) is a tool that extracts the front end build process out of your project so you don't have to worry about managing dependencies and build configuration. It is meant to be used when setting up a **Single Page Application (SPA)** in a **React** ecosystem.

## Underlying Technology

Under the hood, ACE uses the following technology:
* [Gulp](https://gulpjs.com/) for running tasks.
* [Babel](https://babeljs.io/) for JS transpilation.
* [Webpack](https://webpack.js.org/) for JS compilation.
* [Sass](https://sass-lang.com/) for CSS compilation.
* [Browsersync](https://browsersync.io/) for CSS injection.
* [React Hot Loader](http://gaearon.github.io/react-hot-loader/) for JS hot reloading.
* [ESLint](https://eslint.org/) for JS linting.
* [Stylelint](https://stylelint.io/) for Sass linting.
* [PostCSS](https://postcss.org/) to post process CSS.
* [Autoprefixer](https://github.com/postcss/autoprefixer) to vendor prefix CSS.
* [browserl.ist](http://browserl.ist/) to properly verify which vendor prefixes and transpilation features should be added.
* [cssnano](http://cssnano.co/) to minify CSS.
* [UglifyJS](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) to compress JS.
* [Cypress](https://www.cypress.io/) for unit/integration/e2e testing.

You will also get the added benefit of automatically being set up and running with useful SpotHero front end linting modules included in your project (you can choose to remove/change this after project scaffolding is complete).
* [ESLint Config](https://github.com/spothero/eslint-config) - Helps adhere to SpotHero's JS coding guidelines.
* [Stylelint Config](https://github.com/spothero/stylelint-config) - Helps adhere to SpotHero's Sass coding guidelines.

By using ACE in all their projects, developers ensure that no matter what project they're working on, the setup will be familiar to them and feel natural/consistent.

## Credits
ACE is inspired by [Blendid](https://github.com/vigetlabs/blendid).
