const isNil = require('lodash/isNil');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const serve = require('webpack-serve');
const webpackConfig = require('./webpack/config');
const settingsConfig = require('./gulp/lib/get-settings-config');
const projectPath = require('./gulp/lib/project-path');

serve({}, {
    add: (app, middleware, options) => {
        const proxies = settingsConfig.webpack.development.proxies;

        if (!isNil(proxies) && proxies.length) {
            proxies.forEach(item => {
                app.use(convert(proxy(item.path, {target: item.target})));
            });
        }

        if (settingsConfig.webpack.development.historyApiFallback) {
            app.use(convert(history()));
        }
    },
    config: webpackConfig,
    content: projectPath(settingsConfig.root.path),
    devMiddleware: {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            modules: false
        },
        writeToDisk: true
    },
    hotClient: true,
    port: settingsConfig.webpack.port
});
