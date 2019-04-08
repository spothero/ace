const getRCValues = require('./gulp/lib/rc');
const browserslist = require('./browserslist');

const defaults = getRCValues({
    babel: {
        presets: [
            ['@babel/preset-env', {
                targets: {
                    browsers: browserslist,
                    node: 'current'
                },
                useBuiltIns: 'entry',
                corejs: 3,
            }],
            '@babel/preset-react'
        ],
        plugins: [
            ['@babel/plugin-transform-runtime', {corejs: 3}],

            // Stage 1
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-logical-assignment-operators',
            '@babel/plugin-proposal-optional-chaining',
            ['@babel/plugin-proposal-pipeline-operator', {proposal: 'minimal'}],
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-do-expressions',

            // Stage 2
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',

            // Stage 3
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',

            // React
            'react-hot-loader/babel',
        ],
    },
});

module.exports = defaults.babel;
