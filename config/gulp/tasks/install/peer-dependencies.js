const gulp = require('gulp');
const inquirer = require('inquirer');
const sequence = require('run-sequence');
const shell = require('gulp-shell');
const keys = require('lodash/keys');
const mapKeys = require('lodash/mapKeys');
const projectPath = require('../../lib/project-path');
const packageJSON = require('../../../../package.json');

let peers;

const installPeerDepsTask = () => {
    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {read: false})
        .pipe(shell([
            `npm install -S ${peers}`
        ], {
            cwd: process.env.INIT_CWD
        }));
};

const peerDependenciesTask = cb => {
    peers = keys(mapKeys(packageJSON.peerDependencies, (value, key) => {
        return `${key}@${value}`;
    })).join(' ');

    inquirer
        .prompt([
            {
                name: 'peerDeps',
                type: 'confirm',
                message: 'Also install peerDependencies? (Required when starting a new project with ACE)',
                default: true
            }
        ])
        .then(answers => {
            if (answers.peerDeps) {
                sequence(
                    'confirmInstallPeerDeps',
                    cb
                );
            } else {
                cb();
            }
        });
};

gulp.task('confirmInstallPeerDeps', installPeerDepsTask);
gulp.task('installPeerDeps', peerDependenciesTask);

module.exports = peerDependenciesTask;
