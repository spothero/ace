const path = require('path');
const gulp = require('gulp');
const shell = require('gulp-shell');

const serverSSRTask = () => {
    const serverPath = path.resolve(__dirname, '../server.js');
    const flags = `${global.SETTINGS_CONFIG.webpack.server.production.flags} ` || '';

    return shell.task([
        `node ${flags}${serverPath}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

gulp.task('serverSSR', serverSSRTask());
