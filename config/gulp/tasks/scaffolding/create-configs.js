const {
    dest,
    series,
    src,
    task,
} = require('gulp');
const inquirer = require('inquirer');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');

const confirmScaffoldConfigs = () => {
    const projectConfigDir = (process.env.ACE_CONFIG_PATH)
        ? projectPath(process.env.ACE_CONFIG_PATH)
        : projectPath('config');

    return src([
        '../config/settings.js',
        '../config/tasks.js'
    ])
        .pipe(dest(projectConfigDir))
        .on('end', () => {
            log(colors.yellow('Update `settings.js` for project settings and `tasks.js` for Gulp tasks.'));
        });
};

const scaffoldConfigs = cb => {
    inquirer
        .prompt([
            {
                name: 'scaffoldConfigs',
                type: 'confirm',
                message: 'Scaffold ACE config files in /config directory? (you can do this later by calling `npm start -- scaffoldConfigs`)',
                default: true
            }
        ])
        .then(answers => {
            if (answers.scaffoldConfigs) {
                series(confirmScaffoldConfigs);
            } else {
                cb();
            }
        });
};

task('scaffoldConfigs', scaffoldConfigs);

module.exports = scaffoldConfigs;
