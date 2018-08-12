// task `patterns` will start from the root project directory
// example: ['sass/utils/**/*', '!sass/vendor/**/*']

module.exports = {
    clean: {
        patterns: []
    },
    compressImages: {
        jpg: {
            progressive: false
        },
        png: {
            optimizationLevel: 3
        }
    },
    htmlReplace: {
        path: null,
        cssFileName: null,
        jsFileName: null
    },
    lintJS: {
        patterns: []
    },
    lintSass: {
        patterns: []
    },
    sentry: {
        organizationSlug: '',
        authToken: '',
        projectSlug: ''
    },
    watch: {
        jsPatterns: [],
        sassPatterns: []
    },
    additionalTasks: {
        // taskName: require('./tasks/task-name')
    },
    taskSequence: {
        development: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
        test: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
        production: {
            preBuild: [],
            postBuild: [],
            custom: []
        }
    }
};
