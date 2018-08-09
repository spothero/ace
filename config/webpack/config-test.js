const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const settingsConfig = require('../gulp/lib/get-settings-config');
const projectPath = require('../gulp/lib/project-path');

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            ...settingsConfig.env.vars.test
        }
    })
];

if (settingsConfig.webpack.test.useBrowserSync) {
    plugins.push(new BrowserSyncPlugin(
        {
            logPrefix: settingsConfig.browserSync.prefix,
            proxy: `http://${settingsConfig.env.hostname}:${settingsConfig.webpack.port}`,
            notify: false,
            open: settingsConfig.webpack.test.browserSyncOpen,
            host: settingsConfig.env.hostname,
            port: settingsConfig.browserSync.port,
            startPath: settingsConfig.browserSync.startPath,
            files: [
                `${projectPath(settingsConfig.root.path)}/${settingsConfig.css.path}/*.css`,
                `${projectPath(settingsConfig.root.path)}/${settingsConfig.root.index}`
            ]
        },
        {
            reload: false
        }
    ));
}

module.exports = {
    mode: 'development',
    devtool: settingsConfig.webpack.test.sourceMap,
    cache: true,
    output: {
        path: path.resolve(`${projectPath(settingsConfig.root.path)}/${settingsConfig.js.path}`),
        filename: settingsConfig.js.output,
        publicPath: `/${settingsConfig.js.path}/`
    },
    plugins,
    optimization: {
        noEmitOnErrors: true
    }
};
