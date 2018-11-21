const gulp = require('gulp');
const inquirer = require('inquirer');
const sequence = require('run-sequence');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');

const execScaffoldConfigsTask = () => {
    const projectConfigDir = (process.env.ACE_CONFIG_PATH)
        ? projectPath(process.env.ACE_CONFIG_PATH)
        : projectPath('config');

    return gulp.src([
        '../config/settings.js',
        '../config/tasks.js'
    ])
        .pipe(gulp.dest(projectConfigDir))
        .on('end', () => {
            log(colors.yellow('Update `settings.js` for project settings and `tasks.js` for Gulp tasks.'));
        });
};

const scaffoldConfigsTask = cb => {
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
                sequence(
                    'confirmScaffoldConfigs',
                    cb
                );
            } else {
                cb();
            }
        });
};

gulp.task('confirmScaffoldConfigs', execScaffoldConfigsTask);
gulp.task('scaffoldConfigs', scaffoldConfigsTask);
