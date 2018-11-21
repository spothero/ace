const isEqual = require('lodash/isEqual');
const gulp = require('gulp');
const inquirer = require('inquirer');
const sequence = require('run-sequence');
const rename = require('gulp-rename');
const jsDiff = require('diff');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');
const defaultSettings = require('../../../settings');
const defaultTasks = require('../../../tasks');

const diffLogger = part => {
    const color = (part.added)
        ? 'red'
        : (part.removed)
            ? 'green'
            : 'grey';

    process.stderr.write(colors[color](part.value));
};

const execUpdateConfigsTask = () => {
    const areSettingsChanged = !isEqual(defaultSettings, global.SETTINGS_CONFIG);
    const areTasksChanged = !isEqual(defaultTasks, global.TASK_CONFIG);
    const projectConfigDir = (process.env.ACE_CONFIG_PATH)
        ? projectPath(process.env.ACE_CONFIG_PATH)
        : projectPath('config');

    if (areSettingsChanged || areTasksChanged) {
        log(colors.red(`Here is a diff of changes between your project's configuration and updates made in the latest version of ACE.`));
    }

    if (areSettingsChanged) {
        log(colors.yellow.bold('\n\n***** SETTINGS (settings.js) *****'));

        jsDiff.diffJson(defaultSettings, global.SETTINGS_CONFIG).forEach(diffLogger);

        process.stderr.write('\n\n');
    }

    if (areTasksChanged) {
        log(colors.yellow.bold('\n\n***** TASKS (tasks.js) *****'));

        jsDiff.diffJson(defaultTasks, global.TASK_CONFIG).forEach(diffLogger);

        process.stderr.write('\n\n');
    }

    if (areSettingsChanged || areTasksChanged) {
        log(colors.yellow.bold(`${colors.green('GREEN')} denotes new configuration options that have been added to ACE since your last update or ones you've changed in your configuration.`));
        log(colors.yellow.bold(`${colors.red('RED')} denotes changes you've made to to the configuration in your project.`));
        log(colors.yellow.bold(`You'll want to add the new configuration options that are available in your project's configuration files before continuing development.`));
        log(colors.yellow.bold(`Copies of the file(s) can be saved to your configuration folder so that you can copy/paste the new objects along with their commented documentation.`));
    } else {
        log(colors.yellow.bold(`There are no changes between ACE's configuration and your project's configuration files.`));
    }

    return gulp.src([
        '../config/settings.js',
        '../config/tasks.js'
    ])
        .pipe(rename(path => {
            path.basename = `${path.basename}-ace-updated`;
        }))
        .pipe(gulp.dest(projectConfigDir))
        .on('end', () => {
            log(colors.red.bold('ACE copied updated configuration files in to your configuration directory. Please reference the diff(s) above and update your configuration files accordingly, if necessary.'));
        });
};

const updateConfigsTask = cb => {
    inquirer
        .prompt([
            {
                name: 'updateConfigs',
                type: 'confirm',
                message: 'Would you like to copy the config files to your project (files will be named `*-ace-updated.js`)? (you can run `npm start -- updateConfigs` at any time to see this message as well)',
                default: true
            }
        ])
        .then(answers => {
            if (answers.updateConfigs) {
                sequence(
                    'confirmUpdateConfigs',
                    cb
                );
            } else {
                cb();
            }
        });
};

gulp.task('confirmUpdateConfigs', execUpdateConfigsTask);
gulp.task('updateConfigs', updateConfigsTask);
