const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const settingsConfig = require('../gulp/lib/get-settings-config');
const projectPath = require('../gulp/lib/project-path');

const dist = `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}`;

module.exports = {
    mode: 'development',
    devtool: settingsConfig.webpack.client.development.sourceMap,
    cache: true,
    output: {
        path: path.resolve(`${dist}/${settingsConfig.src.js.path}`),
        filename: settingsConfig.webpack.client.output,
        publicPath: `/${settingsConfig.src.js.path}/`
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                ...settingsConfig.env.vars.development
            }
        }),
        new WriteFilePlugin({
            log: false
        }),
        new BrowserSyncPlugin(
            {
                logPrefix: settingsConfig.browserSync.prefix,
                proxy: `http://${settingsConfig.env.hostname}:${settingsConfig.webpack.client.port}`,
                notify: false,
                open: settingsConfig.browserSync.open,
                host: settingsConfig.env.hostname,
                port: settingsConfig.browserSync.port,
                startPath: settingsConfig.browserSync.startPath,
                files: [
                    `${dist}/${settingsConfig.dist.css.path}/*.css`,
                    `${projectPath(settingsConfig.root.path)}/${settingsConfig.src.index}`
                ]
            },
            {
                reload: false
            }
        )
    ],
    optimization: {
        noEmitOnErrors: true
    }
};
