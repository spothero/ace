const webpack = require('webpack');
const settingsConfig = require('../../gulp/lib/get-settings-config');

module.exports = {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                ...settingsConfig.env.vars.development
            }
        }),
    ],
};
