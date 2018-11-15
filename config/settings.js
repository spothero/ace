const hostname = 'localhost';
const browserSyncPort = 3000;

module.exports = {
    env: {
        hostname, // the hostname that the browser initializes with during development
        vars: { // environment variables as key/value pairs to pass to each webpack config for use in client JS code (example: {API_URL: '/api/v1'})
            common: {}, // common env vars to pass to every webpack config
            development: {}, // on by default: `NODE_ENV: JSON.stringify('development')`
            test: {}, // on by default: `NODE_ENV: JSON.stringify('development')`
            production: {} // on by default: `NODE_ENV: JSON.stringify('production')`
        }
    },
    deploy: {
        releaseVersion: null, // production release version/tag/revision to use in tasks (example: add to Sentry for JS file uploads to tag source maps to a specific release)
        staticUrl: '', // location where static assets are hosted on Cloudfront (typically something like `https://d111111abcdef8.cloudfront.net`)
        path: '', // directory path structure for the S3 buckets where assets will be deployed (example: static/path/to/assets)
        invalidatePaths: [], // additional paths to invalidate in Cloudfront during deployments
        sandbox: {
            bucket: '', // AWS bucket to put files in
            cloudFrontDistributionId: '' // cloudfront distribution ID or array of IDs to invalidate
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
        prefix: 'Browsersync', // prefix shown in shell when BS events occur
        port: browserSyncPort, // port to run BS on
        open: true, // automatically opens a new browser window when BS starts during development builds, set to 'external' if `hostname` isn't `localhost`
        startPath: null // an optional path to open the browser window to when BS starts
    },
    webpack: {
        client: {
            port: 9000, // port for webpack to run on
            entry: 'main.js', // string or object, modifies the entry point JS file(s) passed to webpack (path(s) start after `src.js.path`)
            chunkFilename: '[name]-[chunkhash].js', // determines the name of non-entry chunk files (see: https://webpack.js.org/configuration/output/#output-chunkfilename)
            output: '[name]-[hash].js', // name of generated output JS file
            alias: {}, // an object to create aliases to `import` certain modules more easily (see: https://webpack.js.org/configuration/resolve/#resolve-alias)
            resolveModules: [], // additional paths to resolve modules from (path(s) start after the `root.path` setting)
            moduleRules: [], // additional rules to pass to webpack (see: https://webpack.js.org/configuration/module/#module-rules)
            externals: {}, // exclude dependencies from output bundle (see: https://webpack.js.org/configuration/externals/)
            clientLogLevel: 'none', // how to show messages in DevTools when using inline mode in dev server (see https://webpack.js.org/configuration/dev-server/#devserver-clientloglevel)
            optimization: {
                runtimeChunk: 'single', // how the runtime is embedded in chunks (see: https://webpack.js.org/configuration/optimization/#optimization-runtimechunk)
                splitChunks: {}, // configure chunk splitting, direct passthrough (see: https://webpack.js.org/configuration/optimization/#optimization-splitchunks)
            },
            development: { // options to add during a development build
                historyApiFallback: true, // adds support falling back to index.html in case the requested resource at a given URL can't be found (see: https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback)
                proxy: {}, // passes proxy information through to webpack server (see: https://webpack.js.org/configuration/dev-server/#devserver-proxy)
                // For example...
                // {
                //     '/api/v1': `http://${hostname}:8000`
                // },
                sourceMap: 'cheap-module-source-map', // the source map type to use during development
                writeToDisk: true, // whether to write bundled files to disk
            },
            test: {
                useBrowserSync: true, // use Browsersync during tests for CSS injection
                browserSyncOpen: false, // open the browser window when Browsersync starts during tests, same possible settings as `browserSync.open`
                sourceMap: 'cheap-module-source-map', // the source map type to use during testing
            },
            production: {
                sourceMap: 'source-map', // the source map type to use during production
            },
        },
        server: {
            port: 5000, // port for webpack to run on
            entry: null,
        },
    },
    root: {
        path: './', // the root project directory (typically don't want to change this)
    },
    cypress: {
        path: 'cypress', // path to root Cypress folder
    },
    src: {
        path: 'src',
        index: 'index.html', // the index HTML file, where CSS replacement will happen for the htmlReplace task as well as Browsersync watching for changes and reloading
        img: {
            path: 'img' // path to image directory
        },
        js: {
            path: 'js', // path to JS directory where JS files will be watched for transpilation during development
        },
        sass: {
            path: 'sass' // path to Sass directory where Sass files will be watched for compilation during development
        },
        sprites: {
            srcPath: 'sprites', // path to source sprites directory (should contain *-1x and *-2x directories)
            outputPath: 'sprites', // path to output generated combined sprite images, will be appended to `img.path` above (example: /img/sprites)
            sassMapOutputPath: 'utils/sprites', // path to output generated Sass sprite map files, will be appended to `sass.path` above (example: /sass/utils/sprites)
            sassSpritesOutputPath: 'common/sprites', // path to output generated Sass sprite files (these hold actual sprite classes and get imported into your final Sass build), will be appended to `sass.path` above (example: /sass/common/sprites)
            names: [ // the directory names (without the -1x or -2x) where singular sprite images originate, will determine output sprite image name, output sprite Sass file name, and output CSS sprite map names
                // 'common',
                // 'desktop',
                // 'mobile'
            ]
        },
    },
    dist: {
        path: 'dist', // path to the output folder that gets all static asset files during a production build
        manifestFilename: 'manifest.json', // the output name of the manifest JSON file for static asset paths
        css: {
            path: 'css' // path to generated CSS folder
        },
    },
};
