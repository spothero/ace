const fs = require('fs');
const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');
const babelSettings = require('../../../babel');

const generateBabelrcTask = cb => {
    fs.writeFile(
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/.babelrc`,
        JSON.stringify(babelSettings, null, 4),
        writeError => {
            if (writeError) {
                // eslint-disable-next-line no-console
                return console.log(writeError);
            }

            log(colors.green('Generated a `.babelrc` file.'));

            cb();
        }
    );
};

gulp.task('generateBabelrc', generateBabelrcTask);
