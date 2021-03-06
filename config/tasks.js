// See https://spothero.com/uniform/ace/docs/tasks-home/ for documentation on these tasks.

module.exports = {
    clean: {
        patterns: [],
    },
    compressImages: {
        jpg: {
            progressive: false,
        },
        png: {
            optimizationLevel: 3,
        },
    },
    lintSass: {
        patterns: [],
    },
    watch: {
        sassPatterns: [],
    },
    additionalTasks: {
        // taskName: require('./tasks/task-name')
    },
    taskSequence: {
        client: {
            development: {
                preBuild: [],
                postBuild: [],
                custom: [],
            },
            test: {
                preBuild: [],
                postBuild: [],
                custom: [],
            },
            production: {
                preBuild: [],
                postBuild: [],
                custom: [],
            },
        },
        server: {
            development: {
                preBuild: [],
                postBuild: [],
                custom: [],
            },
            test: {
                preBuild: [],
                postBuild: [],
                custom: [],
            },
            production: {
                preBuild: [],
                postBuild: [],
                custom: [],
            },
        },
    },
};
