const isObject = require('lodash/isObject');
const mapValues = require('lodash/mapValues');
const path = require('path');
const webpack = require('webpack');
const SizePlugin = require('size-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const projectPath = require('../../gulp/lib/project-path');
const babelOptions = require('../../babel');

const src = `${projectPath(settingsConfig.root.path)}/${settingsConfig.src.path}`;
const dist = `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}`;
const entry = (isObject(settingsConfig.webpack.client.entry))
    ? mapValues(settingsConfig.webpack.client.entry, item => {
        return `${src}/${settingsConfig.src.js.path}/${item}`;
    })
    : `${src}/${settingsConfig.src.js.path}/${settingsConfig.webpack.client.entry}`;
const extraModules = settingsConfig.webpack.client.resolveModules.map(modulePath => {
    return path.resolve(`${src}/${modulePath}`);
});

const config = {
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
            ...settingsConfig.webpack.client.moduleRules
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': settingsConfig.env.vars.common
        }),
        new SizePlugin(),
        new ManifestPlugin({
            fileName: `../${settingsConfig.dist.manifestFilename}`,
            basePath: `${settingsConfig.src.js.path}/`,
            filter(file) {
                return file.path.endsWith('.js');
            },
        }),
        new HTMLWebpackPlugin({
            filename: `${dist}/${settingsConfig.src.index}`,
            template: `${src}/${settingsConfig.src.index}`,
            inject: settingsConfig.webpack.client.injectAssets || true,
            aceEvent: process.env.ACE_NPM_EVENT,
        }),
    ],
    externals: settingsConfig.webpack.client.externals,
    devServer: {
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
    },
    optimization: {
        runtimeChunk: settingsConfig.webpack.client.optimization.runtimeChunk,
        splitChunks: settingsConfig.webpack.client.optimization.splitChunks,
    }
};

module.exports = config;
