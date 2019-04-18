const path = require('path');
const gulp = require('gulp');
const shell = require('gulp-shell');

const serverSSRTask = () => {
    const serverPath = path.resolve(__dirname, '../server.js');

    return shell.task([
        `node ${serverPath}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

gulp.task('serverSSR', serverSSRTask());
