const gulp = require('gulp');
const sequence = require('run-sequence');

const productionTask = cb => {
    const {
        taskSequence: {
            production: {
                preBuild,
                postBuild,
                custom
            }
        }
    } = global.TASK_CONFIG;
    const seq = (custom && custom.length)
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

    sequence(...seq, cb);
};

gulp.task('production', productionTask);
