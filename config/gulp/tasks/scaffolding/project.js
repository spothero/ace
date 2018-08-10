const gulp = require('gulp');
const inquirer = require('inquirer');
const sequence = require('run-sequence');
const rename = require('gulp-rename');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');

const execScaffoldProjectTask = () => {
    return gulp.src(['../src/**/*'], {dot: true})
        .pipe(rename(path => {
            // `.gitignore` gets ignored in the copy so we have to name the file `gitignore` and rename it in the stream
            if (path.basename === 'gitignore') {
                path.basename = '.gitignore';
            }
        }))
        .pipe(gulp.dest(projectPath(global.SETTINGS_CONFIG.root.path)))
        .on('end', () => {
            log(colors.red('Make sure to run `npm start -- installPeerDeps` before development if you didn\'t install `peerDependencies` yet.'));
            log(colors.yellow('Run `npm start` to begin development.'));
        });
};

const scaffoldProjectTask = cb => {
    inquirer
        .prompt([
            {
                name: 'scaffoldProject',
                type: 'confirm',
                message: 'Scaffold default ACE project files? (you can do this later by calling `npm start -- scaffoldProject`)',
                default: true
            }
        ])
        .then(answers => {
            if (answers.scaffoldProject) {
                sequence(
                    'confirmScaffoldProject',
                    cb
                );
            } else {
                cb();
            }
        });
};

gulp.task('confirmScaffoldProject', execScaffoldProjectTask);
gulp.task('scaffoldProject', scaffoldProjectTask);

module.exports = scaffoldProjectTask;
