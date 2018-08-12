const pick = require('lodash/pick');
const fs = require('fs');
const gulp = require('gulp');
const shell = require('gulp-shell');
const sequence = require('run-sequence');
const merge = require('webpack-merge');
const projectPath = require('../lib/project-path');
const configCommon = require('../../webpack/config-common');
const configTest = require('../../webpack/config-test');

RegExp.prototype.toJSON = RegExp.prototype.toString; // eslint-disable-line no-extend-native

const generateWebpackSettingsTask = cb => {
    const config = pick(merge(configTest, configCommon), ['resolve', 'module']);
    const writePath = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.cypress.path}`;

    if (!fs.existsSync(writePath)) {
        fs.mkdirSync(writePath);
    }

    fs.writeFile(`${writePath}/generated-webpack-settings.json`, JSON.stringify(config, null, 4), writeError => {
        if (writeError) { return console.log(writeError); } // eslint-disable-line no-console

        cb();
    });
};

const cypressOpenTask = () => {
    return shell.task([
        'cypress open'
    ], {
        cwd: process.env.INIT_CWD
    });
};

const cypressRunTask = () => {
    return shell.task([
        'cypress run'
    ], {
        cwd: process.env.INIT_CWD
    });
};

const testTask = cb => {
    const {
        taskSequence: {
            test: {
                preBuild,
                postBuild,
                custom
            }
        }
    } = global.TASK_CONFIG;
    const seq = (custom.length)
        ? custom
        : [
            'clean',
            ...preBuild,
            'sass',
            'lintSass',
            ...postBuild,
            'watch',
            'server'
        ];

    sequence(...seq, cb);
};

gulp.task('generateWebpackSettings', generateWebpackSettingsTask);
gulp.task('cypressOpen', ['generateWebpackSettings'], cypressOpenTask());
gulp.task('cypressRun', ['generateWebpackSettings'], cypressRunTask());
gulp.task('test', testTask);

module.exports = testTask;
