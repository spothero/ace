const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WriteFilePlugin = require('write-file-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const projectPath = require('../../gulp/lib/project-path');

const dist = `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}`;
const analyze = settingsConfig.webpack.client.development.analyze;
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            ...settingsConfig.env.vars.development
        }
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
                `${dist}/${settingsConfig.src.index}`
            ]
        },
        {
            reload: false
        }
    )
];

if (settingsConfig.webpack.client.development.writeToDisk) {
    plugins.push(
        new WriteFilePlugin({
            log: false
        })
    );
}

if (analyze) {
    plugins.push(new BundleAnalyzerPlugin(analyze));
}

module.exports = {
    mode: 'development',
    devtool: settingsConfig.webpack.client.development.sourceMap,
    plugins,
    optimization: {
        noEmitOnErrors: true
    }
};
