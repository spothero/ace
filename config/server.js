const isNil = require('lodash/isNil');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack/config');
const settingsConfig = require('./gulp/lib/get-settings-config');
const projectPath = require('./gulp/lib/project-path');

const proxies = settingsConfig.webpack.development.proxies;
const proxyConfig = {};

if (!isNil(proxies) && proxies.length) {
    proxies.forEach(item => {
        proxyConfig[item.path] = item.target;
    });
}

process.title = 'ace-server';

new WebpackDevServer(webpack(webpackConfig), {
    contentBase: projectPath(settingsConfig.root.path),
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: settingsConfig.webpack.development.historyApiFallback,
    proxy: proxyConfig,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}).listen(settingsConfig.webpack.port, settingsConfig.env.hostname, err => {
    /* eslint-disable no-console */
    if (err) { console.log(err); }

    console.log(`BrowserSync will proxy ${settingsConfig.env.hostname}:${settingsConfig.webpack.port}. Bundling JS using Webpack...`);
    /* eslint-enable no-console */
});
