const gulp = require('gulp');
const shell = require('gulp-shell');

const serverTask = () => {
    return shell.task([
        'webpack-dev-server --inline --hot --config webpack/config.js'
    ]);
};

gulp.task('server', serverTask());

module.exports = serverTask;
