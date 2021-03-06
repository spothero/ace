const webpack = require('webpack');
const isUndefined = require('lodash').isUndefined;
const TerserPlugin = require('terser-webpack-plugin');
const SentryCLIPlugin = require('@sentry/webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const {getEnvVars} = require('../utils');
const projectPath = require('../../gulp/lib/project-path');

const root = projectPath(settingsConfig.root.path);
const dist = `${root}/${settingsConfig.dist.path}`;
const minify = settingsConfig.webpack.server.production.minify;

const config = {
    mode: 'production',
    devtool: settingsConfig.webpack.server.production.sourceMap,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                ...getEnvVars('production'),
            },
        }),
        ...settingsConfig.webpack.server.production.plugins,
    ],
    performance: {
        hints: false,
    },
};

if (settingsConfig.deploy.uploadToSentry) {
    let releaseVersion;

    try {
        releaseVersion = JSON.parse(settingsConfig.deploy.releaseVersion);
    } catch (err) {
        releaseVersion = settingsConfig.deploy.releaseVersion;
    }
    config.plugins.push(
        new SentryCLIPlugin({
            release: releaseVersion,
            include: `${dist}`,
            urlPrefix: '~/dist/',
            ignoreFile: `${root}/.sentrycliserverignore`,
            configFile: `${root}/.sentrycliserverrc`,
        })
    );
}

if (isUndefined(minify) || settingsConfig.webpack.server.production.minify) {
    config.optimization = {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    };
} else {
    config.optimization = {
        minimize: false,
    };
}

module.exports = config;
