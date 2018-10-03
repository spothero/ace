const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const settingsConfig = require('../gulp/lib/get-settings-config');
const projectPath = require('../gulp/lib/project-path');

module.exports = {
    mode: 'production',
    devtool: settingsConfig.webpack.production.sourceMap,
    output: {
        path: path.resolve(`${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}/${settingsConfig.js.path}`),
        filename: settingsConfig.js.min
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                ...settingsConfig.env.vars.production
            }
        })
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
