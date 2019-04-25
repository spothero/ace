const forEach = require('lodash/forEach');
const log = require('fancy-log');
const colors = require('ansi-colors');
const express = require('express');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const projectPath = require('./lib/project-path');
const settingsConfig = require('./lib/get-settings-config');

const isDev = (process.env.ACE_NPM_EVENT === 'start');
const port = settingsConfig.webpack.server.port;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static(projectPath(settingsConfig.dist.path)));

if (isDev) {
    const errorhandler = require('errorhandler');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
    const webpackConfig = require('../webpack/server/config');

    const compiler = webpack(webpackConfig);

    // add local proxies for API requests
    forEach(settingsConfig.webpack.client.development.proxy, (value, key) => {
        app.use(key, proxy({target: value}));
    });

    app.use(errorhandler());
    app.use(webpackDevMiddleware(compiler, {
        publicPath: `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}/${settingsConfig.src.js.path}`,
        serverSideRender: true,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        },
        writeToDisk: settingsConfig.webpack.server.development.writeToDisk,
    }));
    app.use(webpackHotMiddleware(compiler.compilers.find(compilerItem => compilerItem.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler, {
        serverRendererOptions: {
            settings: settingsConfig,
        },
    }));
} else {
    const serverRenderer = require(`${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}/${settingsConfig.webpack.server.output}`).default;

    app.use(serverRenderer({settings: settingsConfig}));
}

app.listen(port, error => {
    if (error) {
        return log(colors.red(`Server error: ${error}`));
    }

    log(colors.green(`Server started on port ${port}...`));
    log(colors.green('Press Ctrl+C to quit.'));
});
