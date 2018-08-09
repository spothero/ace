const webpackMerge = require('webpack-merge');
const configCommon = require('./config-common');
const configDev = require('./config-dev');
const configTest = require('./config-test');
const configProd = require('./config-prod');

const lifecycleEvent = process.env.npm_lifecycle_event.split(':');
const npmEvent = lifecycleEvent[0];

switch (npmEvent) {
    case 'start':
    default:
        module.exports = webpackMerge(configDev, configCommon);
        break;

    case 'test':
    case 'cypress':
        module.exports = webpackMerge(configTest, configCommon);
        break;

    case 'build':
        module.exports = webpackMerge(configProd, configCommon);
        break;
}
