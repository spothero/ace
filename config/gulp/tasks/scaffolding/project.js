const includes = require('lodash/includes');
const {
    dest,
    series,
    src,
    task,
} = require('gulp');
const inquirer = require('inquirer');
const rename = require('gulp-rename');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');

const sources = ['../src/common/**/*'];

const confirmScaffoldProject = () => {
    return src(sources, {dot: true})
        .pipe(rename(path => {
            // `.gitignore` gets ignored in the copy so we have to name the file `gitignore` and rename it in the stream
            if (path.basename === 'gitignore') {
                path.basename = '.gitignore';
            }
        }))
        .pipe(dest(projectPath(global.SETTINGS_CONFIG.root.path)))
        .on('end', () => {
            log(colors.red('Make sure to run `npm start -- installPeerDeps` before development if you didn\'t install `peerDependencies` yet.'));
            log(colors.yellow('Run `npm start` to begin development.'));
        });
};

const scaffoldProject = cb => {
    inquirer
        .prompt([
            {
                name: 'scaffoldProject',
                type: 'list',
                message: 'Scaffold default ACE project files? (you can do this later by calling `npm start -- scaffoldProject`)',
                choices: [
                    'Standard',
                    'SpotHero (only useful for SpotHero employees, will break builds if used by non-employees)',
                    'None'
                ],
                default: 0
            }
        ])
        .then(answers => {
            const type = (includes(answers.scaffoldProject, 'SpotHero'))
                ? 'SpotHero'
                : answers.scaffoldProject;

            if (type === 'Standard' || type === 'SpotHero') {
                sources.push(`../src/${type.toLowerCase()}/**/*`);

                series(confirmScaffoldProject);
            } else {
                cb();
            }
        });
};

task('scaffoldProject', scaffoldProject);

module.exports = scaffoldProject;
