const gulp = require('gulp');
const sequence = require('run-sequence');

const productionTask = cb => {
    const {
        taskSequence: {
            production: {
                preBuild,
                postBuild
            }
        }
    } = global.TASK_CONFIG;

    sequence(
        'clean',
        'lintJS',
        'lintSass',
        ...preBuild,
        'sass',
        'webpack',
        'cssMin',
        'revision',
        ...postBuild,
        cb
    );
};

gulp.task('production', productionTask);

module.exports = productionTask;
