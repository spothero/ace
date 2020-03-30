const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');

gulp.task('lintJS', () => {
    return log(colors.red('lintJS gulp task has been replaced with eslint-loader via webpack'));
});
