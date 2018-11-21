const gulp = require('gulp');
const shell = require('gulp-shell');

const webpackClientTask = () => {
    return shell.task([
        'webpack --colors --hide-modules --config webpack/client/config.js'
    ]);
};

gulp.task('webpackClient', webpackClientTask());
