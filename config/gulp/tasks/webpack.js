const {task} = require('gulp');
const shell = require('gulp-shell');

const webpackClient = () => {
    return shell.task([
        'webpack --colors --hide-modules --config webpack/client/config.js'
    ]);
};

task('webpackClient', webpackClient());
