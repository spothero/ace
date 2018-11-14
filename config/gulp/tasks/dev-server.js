const gulp = require('gulp');
const shell = require('gulp-shell');

const devServerTask = () => {
    return shell.task([
        'webpack-dev-server --inline --hot --config webpack/config.js'
    ]);
};

gulp.task('devServer', devServerTask());

module.exports = devServerTask;
