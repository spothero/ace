const forEach = require('lodash/forEach');
const settingsConfig = require('../gulp/lib/get-settings-config');

module.exports = {
    getEnvVars: environment => {
        const envVars = {};

        forEach(process.env, (value, key) => {
            envVars[key] = JSON.stringify(value);
        });

        return {
            ...envVars,
            ...settingsConfig.env.vars.common,
            ...settingsConfig.env.vars[environment],
        };
    }
};
