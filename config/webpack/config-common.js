const isNil = require('lodash/isNil');
const isObject = require('lodash/isObject');
const mapValues = require('lodash/mapValues');
const path = require('path');
const webpack = require('webpack');
const settingsConfig = require('../gulp/lib/get-settings-config');
const projectPath = require('../gulp/lib/project-path');
const babelOptions = require('../babel');

const npmEvent = process.env.npm_lifecycle_event.split(':')[0];
const entryPoints = (!isNil(settingsConfig.webpack.entry))
    ? isObject(settingsConfig.webpack.entry)
        ? mapValues(settingsConfig.webpack.entry, item => {
            return `${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}/${item}`;
        })
        : `${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}/${settingsConfig.webpack.entry}`
    : `${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}/${settingsConfig.js.input}`;
const entryAddons = [
    `webpack-dev-server/client?http://${settingsConfig.env.hostname}:${settingsConfig.webpack.port}`,
    'webpack/hot/dev-server',
];
const settingsResolveModules = settingsConfig.webpack.resolveModules;
const settingsModulueRules = settingsConfig.webpack.moduleRules || [];
let entry = entryPoints;
let modules = [
    'node_modules',
    path.resolve(`${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}`)
];

if (npmEvent === 'start') {
    // add hot reloading to entry points for local development
    entry = (isObject(entryPoints))
        ? mapValues(entryPoints, entryItem => {
            return entryAddons.concat([entryItem]);
        })
        : entryAddons.concat([entry]);
}

if (settingsResolveModules && settingsResolveModules.length) {
    const extraModules = settingsResolveModules.map(modulePath => {
        return path.resolve(`${projectPath(settingsConfig.root.path)}/${modulePath}`);
    });

    modules = [
        ...modules,
        ...extraModules
    ];
}

const config = {
    entry,
    resolve: {
        alias: settingsConfig.webpack.alias,
        modules,
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            },
            ...settingsModulueRules
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': settingsConfig.env.vars.common
        })
    ]
};

if (settingsConfig.webpack.externals) {
    config.externals = settingsConfig.webpack.externals;
}

module.exports = config;
