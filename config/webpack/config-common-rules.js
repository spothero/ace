const babelOptions = require('../babel');
const settingsConfig = require('../gulp/lib/get-settings-config');

const isDev = process.env.ACE_NPM_EVENT === 'start';
const eslintOptions = settingsConfig.webpack.eslintOptions || {};

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions,
            },
            {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: isDev,
                    ...eslintOptions,
                },
            },
        ],
    },
];
