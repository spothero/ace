const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const projectPath = require('../../gulp/lib/project-path');

const dist = `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}`;
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            ...settingsConfig.env.vars.test
        }
    })
];

if (settingsConfig.webpack.client.test.useBrowserSync) {
    plugins.push(new BrowserSyncPlugin(
        {
            logPrefix: settingsConfig.browserSync.prefix,
            proxy: `http://${settingsConfig.env.hostname}:${settingsConfig.webpack.client.port}`,
            notify: false,
            open: settingsConfig.webpack.client.test.browserSyncOpen,
            host: settingsConfig.env.hostname,
            port: settingsConfig.browserSync.port,
            startPath: settingsConfig.browserSync.startPath,
            files: [
                `${dist}/${settingsConfig.dist.css.path}/*.css`,
                `${dist}/${settingsConfig.src.index}`
            ]
        },
        {
            reload: false
        }
    ));
}

module.exports = {
    mode: 'development',
    devtool: settingsConfig.webpack.client.test.sourceMap,
    cache: true,
    plugins,
    optimization: {
        noEmitOnErrors: true
    }
};