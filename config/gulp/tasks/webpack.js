const gulp = require('gulp');
const shell = require('gulp-shell');

const webpackClientTask = () => {
    return shell.task([
        'webpack --colors --hide-modules --config webpack/client/config.js'
    ]);
};

const webpackSSRTask = () => {
    return shell.task([
        'webpack --colors --hide-modules --config webpack/server/config.js'
    ]);
};

gulp.task('webpackClient', webpackClientTask());
gulp.task('webpackSSR', webpackSSRTask());
