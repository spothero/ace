const {task} = require('gulp');
const path = require('path');
const shell = require('gulp-shell');

const devServerClient = () => {
    return shell.task([
        'webpack-dev-server --inline --hot --config webpack/client/config.js'
    ]);
};

const devServerSSR = () => {
    const configPath = path.resolve(__dirname, '../../webpack/server/config.js');
    const serverPath = `${global.SETTINGS_CONFIG.dist.path}/${global.SETTINGS_CONFIG.webpack.server.output}`;

    return shell.task([
        `webpack --watch --hide-modules --config ${configPath} & wait-on ${serverPath} && nodemon ${serverPath}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

task('devServerClient', devServerClient());
task('devServerSSR', devServerSSR());
