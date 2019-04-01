const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
    plugins: [
        ...plugins,
        ...settingsConfig.webpack.client.production.plugins,
    ],
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        // Disabled because of an issue with Terser breaking valid code: https://github.com/terser-js/terser/issues/120
                        inline: 2
                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};
