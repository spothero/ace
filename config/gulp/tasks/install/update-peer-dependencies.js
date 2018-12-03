const includes = require('lodash/includes');
const gulp = require('gulp');
const inquirer = require('inquirer');
const sequence = require('run-sequence');
const shell = require('gulp-shell');
const keys = require('lodash/keys');
const mapKeys = require('lodash/mapKeys');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');
const packageJSON = require('../../../../package.json');

const shLabel = ' - SpotHero employees only';
const peers = keys(mapKeys(packageJSON.peerDependencies, (value, key) => {
    const suffix = (includes(key, '@spothero'))
        ? shLabel
        : '';

    return `${key}@${value}${suffix}`;
}));
let peersToInstall;

const updatePeerDepsTask = () => {
    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {read: false})
        .pipe(shell([
            `npm install -S ${peersToInstall.join(' ')}`
        ], {
            cwd: process.env.INIT_CWD
        }));
};

const updatePeerDependenciesTask = cb => {
    inquirer
        .prompt([
            {
                name: 'updatePeerDeps',
                type: 'checkbox',
                message: `Which peerDependencies do you want to update? (Checking SpotHero employee only dependencies will fail your install if you aren't a SpotHero employee)`,
                choices: peers,
                default: 0
            }
        ])
        .then(answers => {
            peersToInstall = answers.updatePeerDeps.map(peer => {
                return peer.replace(shLabel, '');
            });

            if (peersToInstall.length) {
                sequence(
                    'confirmUpdatePeerDeps',
                    cb
                );
            } else {
                log(colors.red(`You've chosen not to update any peerDependencies. Make sure you have them all installed in your project or ACE may not function correctly.`));

                cb();
            }
        });
};

gulp.task('confirmUpdatePeerDeps', updatePeerDepsTask);
gulp.task('updatePeerDeps', updatePeerDependenciesTask);
