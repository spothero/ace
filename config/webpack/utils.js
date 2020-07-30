const forEach = require('lodash/forEach');
const settingsConfig = require('../gulp/lib/get-settings-config');

const knownEnvVars = [
    'ACE_ASSET_PATH',
    'ACE_CONFIG_PATH',
    'ACE_DEPLOY_TYPE',
    'ACE_ENVIRONMENT',
    'ACE_NPM_EVENT',
    'BABEL_ENV',
    'INIT_CWD',
    'NODE_ENV',
    'SANDBOX_NAME',
];

module.exports = {
    getEnvVars: environment => {
        const envVars = {};

        // forEach(process.env, (value, key) => {
        //     if (knownEnvVars.indexOf(key) >= 0) {
        //         envVars[key] = JSON.stringify(value);
        //     }
        // });

        forEach(knownEnvVars, (key) => {
            const value = process.env[key];
            
            if (value) {
                envVars[key] = JSON.stringify(value);
            }
        })

        return {
            ...envVars,
            ...settingsConfig.env.vars.common,
            ...settingsConfig.env.vars[environment],
        };
    },
};
