// See https://spothero.com/uniform/ace/docs/settings-home for documentation on these settings.

const hostname = 'localhost';

module.exports = {
    env: {
        hostname,
        vars: {
            common: {},
            development: {},
            test: {},
            production: {}
        }
    },
    deploy: {
        releaseVersion: null,
        staticUrl: '',
        path: '',
        invalidatePaths: [],
        sandbox: {
            bucket: '',
            cloudFrontDistributionId: ''
        },
        staging: {
            bucket: '',
            cloudFrontDistributionId: ''
        },
        production: {
            bucket: '',
            cloudFrontDistributionId: ''
        }
    },
    browserSync: {
        prefix: 'Browsersync',
        port: 3000,
        open: true,
        startPath: null
    },
    webpack: {
        client: {
            port: 9000,
            entry: 'main.js',
            chunkFilename: '[name]-[chunkhash].js',
            output: '[name]-[hash].js',
            injectAssets: true,
            alias: {},
            resolveModules: [],
            moduleRules: [],
            externals: {},
            clientLogLevel: 'none',
            optimization: {
                runtimeChunk: false,
                splitChunks: {},
            },
            development: {
                historyApiFallback: true,
                proxy: {},
                sourceMap: 'cheap-module-source-map',
                writeToDisk: true,
                analyze: null,
                plugins: [],
            },
            test: {
                useBrowserSync: true,
                browserSyncOpen: false,
                sourceMap: 'cheap-module-source-map',
                plugins: [],
            },
            production: {
                sourceMap: 'source-map',
                analyze: {
                    generateStatsFile: true,
                    analyzerMode: 'static',
                    openAnalyzer: false,
                },
                plugins: [],
            },
        },
        server: {
            port: 9000,
            entry: 'server.js',
            output: 'server.bundle.js',
            alias: {},
            resolveModules: [],
            moduleRules: [],
            externals: null,
            development: {
                sourceMap: 'cheap-module-source-map',
                writeToDisk: true,
                plugins: [],
            },
            test: {
                sourceMap: 'cheap-module-source-map',
                plugins: [],
            },
            production: {
                sourceMap: 'source-map',
                plugins: [],
            },
        },
    },
    root: {
        path: './',
    },
    cypress: {
        path: 'cypress',
    },
    src: {
        path: 'src',
        index: 'index.html',
        img: {
            path: 'img'
        },
        js: {
            path: 'js',
        },
        sass: {
            path: 'sass'
        },
        sprites: {
            srcPath: 'sprites',
            outputPath: 'sprites',
            sassMapOutputPath: 'utils/sprites',
            sassSpritesOutputPath: 'common/sprites',
            names: []
        },
    },
    dist: {
        path: 'dist',
        manifest: {
            filename: 'manifest.json',
        },
        css: {
            path: 'css'
        },
    },
};
