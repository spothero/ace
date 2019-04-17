const isObject = require('lodash/isObject');
const isUndefined = require('lodash/isUndefined');
const mapValues = require('lodash/mapValues');
const path = require('path');
const webpack = require('webpack');
const SizePlugin = require('size-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const projectPath = require('../../gulp/lib/project-path');
const babelOptions = require('../../babel');

const isServer = (process.env.ACE_ENVIRONMENT === 'server');
const isDev = (process.env.ACE_NPM_EVENT !== 'build');
const src = `${projectPath(settingsConfig.root.path)}/${settingsConfig.src.path}`;
const dist = `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}`;
const hotMiddleware = `webpack-hot-middleware/client?quiet=true`;
const entry = (isObject(settingsConfig.webpack.client.entry))
    ? mapValues(settingsConfig.webpack.client.entry, item => {
        return (isServer && isDev)
            ? [hotMiddleware, `${src}/${settingsConfig.src.js.path}/${item}`]
            : `${src}/${settingsConfig.src.js.path}/${item}`;
    })
    : (isServer && isDev)
        ? [hotMiddleware, `${src}/${settingsConfig.src.js.path}/${settingsConfig.webpack.client.entry}`]
        : `${src}/${settingsConfig.src.js.path}/${settingsConfig.webpack.client.entry}`;
const extraModules = settingsConfig.webpack.client.resolveModules.map(modulePath => {
    return path.resolve(`${src}/${modulePath}`);
});
const plugins = [
    new webpack.DefinePlugin({
        'process.env': settingsConfig.env.vars.common
    }),
    new SizePlugin(),
    new WebpackAssetsManifest({
        output: `../${settingsConfig.dist.manifest.filename}`,
        writeToDisk: true,
        merge: true,
        customize: (entryItem, original, manifest, asset) => {
            // don't add .map files to manifest
            if (entryItem.key.toLowerCase().endsWith('.map')) {
                return false;
            }

            // add JS path before each JS file key/value pair in manifest
            if (entryItem.key.toLowerCase().endsWith('.js')) {
                return {
                    key: `${settingsConfig.src.js.path}/${entryItem.key}`,
                    value: `${settingsConfig.src.js.path}/${entryItem.value}`,
                };
            }
        }
    }),
];

if (!isServer) {
    plugins.push(new HTMLWebpackPlugin({
        filename: `${dist}/${settingsConfig.src.index}`,
        template: `${src}/${settingsConfig.src.index}`,
        inject: settingsConfig.webpack.client.injectAssets,
        aceEvent: process.env.ACE_NPM_EVENT,
    }));
}

const config = {
    name: 'client',
    target: 'web',
    entry,
    output: {
        path: path.resolve(`${dist}/${settingsConfig.src.js.path}`),
        filename: settingsConfig.webpack.client.output,
        chunkFilename: settingsConfig.webpack.client.chunkFilename,
    },
    resolve: {
        alias: settingsConfig.webpack.client.alias,
        modules: [
            'node_modules',
            path.resolve(`${src}/${settingsConfig.src.js.path}`),
            ...extraModules,
        ],
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
            {
                test: /\.jsx?$/,
                include: /node_modules/,
                use: 'react-hot-loader/webpack'
            },
            ...settingsConfig.webpack.client.moduleRules
        ]
    },
    plugins,
    externals: settingsConfig.webpack.client.externals,
    optimization: {
        runtimeChunk: settingsConfig.webpack.client.optimization.runtimeChunk,
        splitChunks: settingsConfig.webpack.client.optimization.splitChunks,
    }
};

if (!isServer && isDev) {
    config.devServer = {
        contentBase: path.resolve(`${dist}`),
        publicPath: path.resolve(`${dist}/${settingsConfig.src.js.path}`),
        port: settingsConfig.webpack.client.port,
        host: settingsConfig.env.hostname,
        hot: true,
        clientLogLevel: settingsConfig.webpack.client.clientLogLevel,
        historyApiFallback: settingsConfig.webpack.client.development.historyApiFallback,
        proxy: settingsConfig.webpack.client.development.proxy,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    };
}

module.exports = config;
