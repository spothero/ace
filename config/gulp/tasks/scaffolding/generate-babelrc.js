const {task} = require('gulp');
const fs = require('fs');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');
const babelSettings = require('../../../babel');

const generateBabelrc = cb => {
    fs.writeFile(`${projectPath(global.SETTINGS_CONFIG.root.path)}/.babelrc`, JSON.stringify(babelSettings, null, 4), writeError => {
        if (writeError) { return console.log(writeError); } // eslint-disable-line no-console

        log(colors.green('Generated a `.babelrc` file.'));

        cb();
    });
};

task('generateBabelrc', generateBabelrc);
