const path = require('path');
const nodeExternals = require('webpack-node-externals');
const settingsConfig = require('../../gulp/lib/get-settings-config');
const projectPath = require('../../gulp/lib/project-path');
const babelOptions = require('../../babel');

const src = `${projectPath(settingsConfig.root.path)}/${settingsConfig.src.path}`;
const dist = `${projectPath(settingsConfig.root.path)}/${settingsConfig.dist.path}`;
const extraModules = settingsConfig.webpack.server.resolveModules.map(modulePath => {
    return path.resolve(`${src}/${modulePath}`);
});

const config = {
    target: 'node',
    entry: `${src}/${settingsConfig.webpack.server.entry}`,
    output: {
        path: dist,
        filename: settingsConfig.webpack.server.output,
        publicPath: '/'
    },
    externals: [
        nodeExternals()
    ],
    resolve: {
        alias: settingsConfig.webpack.server.alias,
        modules: [
            `${src}/${settingsConfig.src.js.path}`,
            ...extraModules,
        ],
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            },
            ...settingsConfig.webpack.server.moduleRules
        ]
    },
};

module.exports = config;
