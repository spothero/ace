const isNil = require('lodash/isNil');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const prompt = require('gulp-prompt');
const shell = require('gulp-shell');
const keys = require('lodash/keys');
const mapKeys = require('lodash/mapKeys');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');
const packageJSON = require('../../../../package.json');

let peersToInstall = null;

const askWhichPeerDeps = () => {
    const peers = keys(mapKeys(packageJSON.peerDependencies, (value, key) => {
        return `${key}@${value}`;
    }));

    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {read: false})
        .pipe(prompt.prompt({
            type: 'checkbox',
            name: 'deps',
            message: 'Which peerDependencies do you want to update? (use arrow keys and spacebar to make selections)',
            choices: peers
        }, ({deps}) => {
            if (deps.length) {
                peersToInstall = deps.join(' ');
            } else {
                log(colors.red(`You've chosen not to update any peerDependencies. Make sure you have them all installed in your project or ACE may not function correctly.`));
            }
        }));
};

const updatePeerDependenciesTask = () => {
    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {read: false})
        .pipe(gulpif(!isNil(peersToInstall), shell([
            `npm install -S ${peersToInstall}`
        ], {
            cwd: process.env.INIT_CWD
        })));
};

gulp.task('askWhichPeerDeps', askWhichPeerDeps);
gulp.task('updatePeerDeps', ['askWhichPeerDeps'], updatePeerDependenciesTask);

module.exports = updatePeerDependenciesTask;
