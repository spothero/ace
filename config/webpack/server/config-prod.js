const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');

module.exports = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                ...settingsConfig.env.vars.production
            }
        }),
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
