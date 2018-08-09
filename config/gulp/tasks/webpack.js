const gulp = require('gulp');
const shell = require('gulp-shell');

const webpackTask = () => {
    return shell.task([
        'webpack --colors --hide-modules --config webpack/config.js'
    ]);
};

gulp.task('webpack', webpackTask());

module.exports = webpackTask;
