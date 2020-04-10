const isObject = require('lodash/isObject');
const mapValues = require('lodash/mapValues');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const projectPath = require('../../gulp/lib/project-path');
const configCommonRules = require('../config-common-rules');

const isServer = process.env.ACE_ENVIRONMENT === 'server';
const isDev = process.env.ACE_NPM_EVENT !== 'build';
const src = `${projectPath(settingsConfig.root.path)}/${
    settingsConfig.src.path
}`;
const dist = `${projectPath(settingsConfig.root.path)}/${
    settingsConfig.dist.path
}`;
const hotPatch = 'react-hot-loader/patch';
const hotMiddleware = 'webpack-hot-middleware/client?quiet=true';
const singleEntryFile = `${src}/${settingsConfig.src.js.path}/${settingsConfig.webpack.client.entry}`;
const entry = isObject(settingsConfig.webpack.client.entry)
    ? mapValues(settingsConfig.webpack.client.entry, item => {
          const entryFile = `${src}/${settingsConfig.src.js.path}/${item}`;

          return isServer && isDev
              ? [hotPatch, hotMiddleware, entryFile]
              : isDev
              ? [hotPatch, entryFile]
              : entryFile;
      })
    : isServer && isDev
    ? [hotPatch, hotMiddleware, singleEntryFile]
    : isDev
    ? [hotPatch, singleEntryFile]
    : singleEntryFile;
const extraModules = settingsConfig.webpack.client.resolveModules.map(
    modulePath => {
        return path.resolve(`${src}/${modulePath}`);
    }
);
const plugins = [
    !settingsConfig.webpack.client.injectAssets &&
        new WebpackAssetsManifest({
            writeToDisk: true,
            merge: true,
            customize: (entryItem, original, manifest, asset) => {
                const entryItemKey = entryItem.key.toLowerCase();

                // don't add .map files to manifest
                if (entryItemKey.endsWith('.map')) {
                    return false;
                }

                // add JS path before each JS file key/value pair in manifest
                // if it isn't already in a folder
                if (
                    entryItemKey.endsWith('.js') &&
                    !entryItemKey.startsWith('css/') &&
                    !entryItemKey.startsWith('js/')
                ) {
                    return {
                        key: `${settingsConfig.src.js.path}/${entryItem.key}`,
                        value: `${entryItem.value}`,
                    };
                }
            },
        }),
    new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name]-[hash].css',
    }),
    new StylelintPlugin({
        context: src,
    }),
].filter(Boolean);

if (!isServer) {
    plugins.push(
        new HTMLWebpackPlugin({
            filename: `${dist}/${settingsConfig.src.index}`,
            template: `${src}/${settingsConfig.src.index}`,
            inject: settingsConfig.webpack.client.injectAssets,
            aceEvent: process.env.ACE_NPM_EVENT,
            ...settingsConfig.webpack.client.injectOptions,
        })
    );
}

const config = {
    name: 'client',
    target: 'web',
    entry,
    output: {
        path: path.resolve(`${dist}`),
        publicPath: '/',
        filename: settingsConfig.webpack.client.output,
        chunkFilename: settingsConfig.webpack.client.chunkFilename,
    },
    resolve: {
        alias: settingsConfig.webpack.client.alias,
        modules: [
            'node_modules',
            path.resolve(`${src}/${settingsConfig.src.js.path}`),
            ...extraModules,
        ],
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            ...configCommonRules,
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: loader => {
                                return [
                                    require('autoprefixer')(),
                                    require('postcss-flexbugs-fixes')(),
                                    !isDev &&
                                        require('cssnano')({
                                            discardComments: {
                                                removeAll: true,
                                            },
                                        }),
                                ].filter(Boolean);
                            },
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                            sassOptions: {
                                includePaths: [
                                    'node_modules',
                                    path.resolve(
                                        `${src}/${settingsConfig.src.sass.path}`
                                    ),
                                ],
                            },
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                    name: '[name].[ext]',
                },
            },

            ...settingsConfig.webpack.client.moduleRules,
        ],
    },
    plugins,
    externals: settingsConfig.webpack.client.externals,
    optimization: {
        runtimeChunk: settingsConfig.webpack.client.optimization.runtimeChunk,
        splitChunks: settingsConfig.webpack.client.optimization.splitChunks,
    },
};

if (isDev) {
    config.module.rules.push({
        test: /\.jsx?$/,
        include: /node_modules/,
        use: 'react-hot-loader/webpack',
    });
}

if (!isServer && isDev) {
    config.devServer = {
        contentBase: path.resolve(`${dist}`),
        publicPath: path.resolve(`${dist}/${settingsConfig.src.js.path}`),
        port: settingsConfig.webpack.client.port,
        host: settingsConfig.env.hostname,
        hot: true,
        clientLogLevel: settingsConfig.webpack.client.clientLogLevel,
        historyApiFallback:
            settingsConfig.webpack.client.development.historyApiFallback,
        proxy: settingsConfig.webpack.client.development.proxy,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    };
}

module.exports = config;
