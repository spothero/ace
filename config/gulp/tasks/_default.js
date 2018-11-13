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
            'htmlCopy',
            'sass',
            'lintSass',
            ...postBuild,
            'watch',
            'server'
        ];

    sequence(...seq, cb);
};

gulp.task('default', developmentTask);

module.exports = developmentTask;
