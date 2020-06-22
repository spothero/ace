const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const SentryCLIPlugin = require('@sentry/webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const {getEnvVars} = require('../utils');
const projectPath = require('../../gulp/lib/project-path');

const dist = `${projectPath(settingsConfig.root.path)}/${
    settingsConfig.dist.path
}`;

const analyze = settingsConfig.webpack.client.production.analyze;
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            ...getEnvVars('production'),
        },
    }),
];

if (settingsConfig.deploy.uploadToSentry) {
    let releaseVersion;

    try {
        releaseVersion = JSON.parse(settingsConfig.deploy.releaseVersion);
    } catch (err) {
        releaseVersion = settingsConfig.deploy.releaseVersion;
    }

    plugins.push(
        new SentryCLIPlugin({
            release: releaseVersion,
            include: `${dist}/js`,
            ignoreFile: '.sentrycliignore',
            configFile: '.sentryclirc',
        })
    );
}

if (analyze) {
    plugins.push(new BundleAnalyzerPlugin(analyze));
}

module.exports = {
    mode: 'production',
    devtool: settingsConfig.webpack.client.production.sourceMap,
    plugins: [...plugins, ...settingsConfig.webpack.client.production.plugins],
    performance: {
        hints: false,
    },
    optimization: {
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
    },
};
