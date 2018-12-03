const webpackMerge = require('webpack-merge');
const configCommon = require('./config-common');
const configDev = require('./config-dev');
const configTest = require('./config-test');
const configProd = require('./config-prod');

switch (process.env.ACE_NPM_EVENT) {
    case 'start':
    default:
        module.exports = webpackMerge(configDev, configCommon);
        break;

    case 'test':
        module.exports = webpackMerge(configTest, configCommon);
        break;

    case 'build':
        module.exports = webpackMerge(configProd, configCommon);
        break;
}
