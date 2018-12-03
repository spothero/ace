const gulp = require('gulp');
const sequence = require('run-sequence');

process.title = 'ace-server';

const developmentTask = cb => {
    const {
        taskSequence: {
            development: {
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
            ...preBuild,
            'sass',
            'lintSass',
            ...postBuild,
            'watch',
            'devServerClient'
        ];

    sequence(...seq, cb);
};

gulp.task('default', developmentTask);
