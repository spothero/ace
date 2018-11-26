const webpackMerge = require('webpack-merge');
const configCommon = require('./config-common');
const configDev = require('./config-dev');

switch (process.env.ACE_NPM_EVENT) {
    case 'start':
    default:
        module.exports = webpackMerge(configDev, configCommon);
        break;
}
