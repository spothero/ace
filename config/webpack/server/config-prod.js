const webpack = require('webpack');
const isUndefined = require('lodash').isUndefined;
const TerserPlugin = require('terser-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const {getEnvVars} = require('../utils');

const minify = settingsConfig.webpack.server.production.minify;

const config = {
    mode: 'production',
    devtool: settingsConfig.webpack.server.production.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                ...getEnvVars('production'),
            },
        }),
        ...settingsConfig.webpack.server.production.plugins,
    ],
    performance: {
        hints: false,
    },
};

if (isUndefined(minify) || settingsConfig.webpack.server.production.minify) {
    config.optimization = {
        minimizer: [
            new TerserPlugin({
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
    };
} else {
    config.optimization = {
        minimize: false,
    };
}

module.exports = config;
