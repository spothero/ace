const gulp = require('gulp');
const sequence = require('run-sequence');

const developmentTask = cb => {
    const {
        taskSequence: {
            development: {
                preBuild,
                postBuild
            }
        }
    } = global.TASK_CONFIG;

    sequence(
        'clean',
        ...preBuild,
        'sass',
        'lintSass',
        ...postBuild,
        'watch',
        'server',
        cb
    );
};

gulp.task('default', developmentTask);

module.exports = developmentTask;
