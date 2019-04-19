const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const {getEnvVars} = require('../utils');

module.exports = {
    mode: 'production',
    devtool: settingsConfig.webpack.server.production.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                ...getEnvVars('production'),
            }
        }),
        ...settingsConfig.webpack.server.production.plugins,
    ],
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    }
};
