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
        path: '', // directory path structure for the buckets where assets will be deployed (example: static/path/to/assets)
        invalidatePaths: [], // additional paths to invalidate in Cloudfront during deployments
        sandbox: {
            bucket: '', // AWS bucket to put files in
            cloudFrontDistributionId: '' // cloudfront distribution ID
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
        port: 9000, // port for webpack to run on
        entry: null, // string or object, optionally modifies the entry point JS file(s) passed to webpack (path(s) start after the `js.path`)
        alias: {}, // an object to create aliases to `import` certain modules more easily (see: https://webpack.js.org/configuration/resolve/#resolve-alias)
        resolveModules: [], // additional paths to resolve modules from (path(s) start after the `root.path`)
        moduleRules: [], // additional rules to pass to webpack (see: https://webpack.js.org/configuration/module/#module-rules)
        externals: null, // exclude dependencies from output bundle (see: https://webpack.js.org/configuration/externals/)
        development: { // options to add during a development build
            historyApiFallback: true, // adds support falling back to index.html in case the requested resource at a given URL can't be found
            proxies: [ // passes proxy information through to webpack server
                // {
                //     path: '/api/v1',
                //     target: `http://${hostname}:8000`
                // }
            ],
            sourceMap: 'cheap-module-source-map' // the source map type to use during development
        },
        test: {
            useBrowserSync: true, // use Browsersync during tests for CSS injection
            browserSyncOpen: false, // open the browser window when Browsersync starts during tests, same possible settings as `browserSync.open`
            sourceMap: 'cheap-module-source-map' // the source map type to use during testing
        },
        production: {
            sourceMap: 'source-map' // the source map type to use during production
        }
    },
    cypress: {
        path: 'cypress' // path to root Cypress folder
    },
    root: {
        path: './', // the root project directory (typically don't want to change this)
        index: 'index.html' // the index HTML file where CSS and JS replacement will happen for the htmlReplace task as well as Browsersync watching for changes and reloading
    },
    dist: {
        path: 'dist' // path to the output folder that gets all static asset files during a production build
    },
    css: {
        path: 'css' // path to generated CSS folder
    },
    sass: {
        path: 'sass' // path to Sass directory where Sass files will be watched for compilation during development
    },
    img: {
        path: 'img' // path to image directory
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
    js: {
        path: 'js', // path to JS directory where JS files will be watched for transpilation during development
        input: 'main.js', // name of entry JS file (modify webpack.entry to pass multiple files)
        output: 'bundle.js', // name of generated output JS file during development builds
        min: 'bundle.min.js' // name of uglified generated output JS file during production builds
    }
};
