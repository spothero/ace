const webpack = require('webpack');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const {getEnvVars} = require('../utils');

module.exports = {
    mode: 'development',
    devtool: settingsConfig.webpack.server.test.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('test'),
                ...getEnvVars('test'),
            },
        }),
        ...settingsConfig.webpack.server.test.plugins,
    ],
};
