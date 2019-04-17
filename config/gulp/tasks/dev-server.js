const path = require('path');
const gulp = require('gulp');
const shell = require('gulp-shell');

const devServerClientTask = () => {
    return shell.task([
        'webpack-dev-server --inline --hot --config webpack/client/config.js'
    ]);
};

const devServerSSRTask = () => {
    const serverPath = path.resolve(__dirname, '../server.js');

    return shell.task([
        `node ${serverPath}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

gulp.task('devServerClient', devServerClientTask());
gulp.task('devServerSSR', devServerSSRTask());
