const webpackMerge = require('webpack-merge');
const configClient = require('../client/config');
const configServerCommon = require('./config-common');
const configServerDev = require('./config-dev');
const configServerProd = require('./config-prod');

switch (process.env.ACE_NPM_EVENT) {
    case 'start':
    default:
        module.exports = [
            configClient,
            webpackMerge(configServerDev, configServerCommon)
        ];

        break;

    case 'build':
        module.exports = [
            configClient,
            webpackMerge(configServerProd, configServerCommon)
        ];

        break;
}
