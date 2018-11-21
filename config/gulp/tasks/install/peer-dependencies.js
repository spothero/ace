const filter = require('lodash/filter');
const includes = require('lodash/includes');
const gulp = require('gulp');
const inquirer = require('inquirer');
const sequence = require('run-sequence');
const shell = require('gulp-shell');
const keys = require('lodash/keys');
const mapKeys = require('lodash/mapKeys');
const projectPath = require('../../lib/project-path');
const packageJSON = require('../../../../package.json');

let peers = keys(mapKeys(packageJSON.peerDependencies, (value, key) => {
    return `${key}@${value}`;
}));

const installPeerDepsTask = () => {
    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {read: false})
        .pipe(shell([
            `npm install -S ${peers.join(' ')}`
        ], {
            cwd: process.env.INIT_CWD
        }));
};

const installPeerDependenciesTask = cb => {
    inquirer
        .prompt([
            {
                name: 'peerDeps',
                type: 'list',
                message: 'Also install peerDependencies? (Required when starting a new project with ACE)',
                choices: [
                    'Yes',
                    'Yes + SpotHero (only useful for SpotHero employees, will fail install if used by non-employees)',
                    'No'
                ],
                default: 0
            }
        ])
        .then(answers => {
            const type = (includes(answers.peerDeps, 'SpotHero'))
                ? 'SpotHero'
                : answers.peerDeps;

            if (type === 'Yes' || type === 'SpotHero') {
                if (type !== 'SpotHero') {
                    peers = filter(peers, peer => {
                        return !includes(peer, '@spothero');
                    });
                }

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
gulp.task('installPeerDeps', installPeerDependenciesTask);
