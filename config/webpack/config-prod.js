const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const settingsConfig = require('../gulp/lib/get-settings-config');

module.exports = {
    mode: 'production',
    devtool: settingsConfig.webpack.client.production.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                ...settingsConfig.env.vars.production
            }
        }),
        new ManifestPlugin({
            fileName: `../${settingsConfig.dist.manifestFilename}`,
            basePath: `${settingsConfig.src.js.path}/`,
            filter(file) {
                return file.path.endsWith('.js');
            },
        }),
    ],
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        // Disabled because of an issue with Terser breaking valid code: https://github.com/terser-js/terser/issues/120
                        inline: 2
                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};
