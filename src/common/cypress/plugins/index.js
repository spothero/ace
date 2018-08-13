const webpack = require('@cypress/webpack-preprocessor');
const webpackConfig = require('../generated-webpack-settings.json');

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    // clean up the generated regular expressions since they were mangled after JSON.stringify
    webpackConfig.module.rules[0].test = /\.jsx?$/;
    webpackConfig.module.rules[0].exclude = /node_modules/;

    on('file:preprocessor', webpack({
        webpackOptions: webpackConfig
    }));
};
