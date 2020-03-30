const fs = require('fs');
const babelOptions = require('../babel');
const projectPath = require('../gulp/lib/project-path');
const SETTINGS_CONFIG = require('../gulp/lib/get-settings-config');

const isDev = process.env.ACE_NPM_EVENT === 'start';

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions
            },
            {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: isDev
                }
            }
        ]
    }
]