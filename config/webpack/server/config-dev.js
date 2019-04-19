const webpack = require('webpack');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const {getEnvVars} = require('../utils');

module.exports = {
    mode: 'development',
    devtool: settingsConfig.webpack.server.development.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                ...getEnvVars('development'),
            }
        }),
        ...settingsConfig.webpack.server.development.plugins,
    ],
};
