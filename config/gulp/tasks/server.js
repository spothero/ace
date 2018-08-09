const gulp = require('gulp');
const shell = require('gulp-shell');

const serverTask = () => {
    return shell.task([
        'node server.js'
    ]);
};

gulp.task('server', serverTask());

module.exports = serverTask;
