const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');

const analyze = settingsConfig.webpack.client.production.analyze;
const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            ...settingsConfig.env.vars.production
        }
    }),
];

if (analyze) {
    plugins.push(new BundleAnalyzerPlugin(analyze));
}

module.exports = {
    mode: 'production',
    devtool: settingsConfig.webpack.client.production.sourceMap,
    output: {
        publicPath: `${settingsConfig.src.js.path}/`,
    },
    plugins,
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
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
    }
};
