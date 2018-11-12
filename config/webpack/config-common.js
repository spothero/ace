const isNil = require('lodash/isNil');
const isObject = require('lodash/isObject');
const mapValues = require('lodash/mapValues');
const path = require('path');
const webpack = require('webpack');
const settingsConfig = require('../gulp/lib/get-settings-config');
const projectPath = require('../gulp/lib/project-path');
const babelOptions = require('../babel');

const entry = (!isNil(settingsConfig.webpack.entry))
    ? isObject(settingsConfig.webpack.entry)
        ? mapValues(settingsConfig.webpack.entry, item => {
            return `${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}/${item}`;
        })
        : `${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}/${settingsConfig.webpack.entry}`
    : `${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}/${settingsConfig.js.input}`;
const settingsResolveModules = settingsConfig.webpack.resolveModules;
const settingsModulueRules = settingsConfig.webpack.moduleRules || [];
let modules = [
    'node_modules',
    path.resolve(`${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}`)
];

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
    ],
    devServer: {
        contentBase: projectPath(settingsConfig.root.path),
        publicPath: path.resolve(`${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}`),
        port: settingsConfig.webpack.port,
        host: settingsConfig.env.hostname,
        hot: true,
        clientLogLevel: settingsConfig.webpack.clientLogLevel,
        historyApiFallback: settingsConfig.webpack.development.historyApiFallback,
        proxy: settingsConfig.webpack.development.proxy,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }
};

if (settingsConfig.webpack.externals) {
    config.externals = settingsConfig.webpack.externals;
}

module.exports = config;
