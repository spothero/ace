const {
    series,
    task,
} = require('gulp');

const productionClient = () => {
    const {
        taskSequence: {
            client: {
                production: {
                    preBuild,
                    postBuild,
                    custom
                }
            }
        }
    } = global.TASK_CONFIG;
    const seq = (custom.length)
        ? custom
        : [
            'clean',
            'lintJS',
            'lintSass',
            ...preBuild,
            'sass',
            'cssMin',
            'webpackClient',
            'htmlReplace',
            ...postBuild
        ];

    series(...seq);
};

task('production', productionClient);
