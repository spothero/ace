const pick = require('lodash/pick');
const fs = require('fs');
const gulp = require('gulp');
const sequence = require('run-sequence');
const merge = require('webpack-merge');
const projectPath = require('../lib/project-path');
const configCommon = require('../../webpack/client/config-common');
const configTest = require('../../webpack/client/config-test');

RegExp.prototype.toJSON = RegExp.prototype.toString; // eslint-disable-line no-extend-native

process.title = 'ace-test';

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

const testClientTask = cb => {
    const {
        taskSequence: {
            client: {
                test: {
                    preBuild,
                    postBuild,
                    custom
                }
            }
        }
    } = global.TASK_CONFIG;
    const seq = (custom && custom.length)
        ? custom
        : [
            'clean',
            ...preBuild,
            'sass',
            'cssManifest',
            'lintSass',
            ...postBuild,
            'watch',
            'devServerClient'
        ];

    sequence(...seq, cb);
};

gulp.task('generateWebpackSettings', generateWebpackSettingsTask);
gulp.task('test', testClientTask);
