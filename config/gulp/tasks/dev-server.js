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
    const env = (process.env.ACE_NPM_EVENT === 'test') ? 'test' : 'development';
    const flags = `${global.SETTINGS_CONFIG.webpack.server[env].flags} ` || '';
    const flagsDefinition = (flags) ? `${flags} ` : '';

    return shell.task([
        `node ${flagsDefinition}${serverPath}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

gulp.task('devServerClient', devServerClientTask());
gulp.task('devServerSSR', devServerSSRTask());
