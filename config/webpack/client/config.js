const webpackMerge = require('webpack-merge');
const configClientCommon = require('./config-common');
const configClientDev = require('./config-dev');
const configClientTest = require('./config-test');
const configClientProd = require('./config-prod');

switch (process.env.ACE_NPM_EVENT) {
    case 'start':
    default:
        module.exports = webpackMerge(configClientDev, configClientCommon);
        break;

    case 'test':
        module.exports = webpackMerge(configClientTest, configClientCommon);
        break;

    case 'build':
        module.exports = webpackMerge(configClientProd, configClientCommon);
        break;
}
