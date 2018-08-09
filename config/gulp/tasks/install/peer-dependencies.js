const gulp = require('gulp');
const prompt = require('gulp-prompt');
const shell = require('gulp-shell');
const keys = require('lodash/keys');
const mapKeys = require('lodash/mapKeys');
const projectPath = require('../../lib/project-path');
const packageJSON = require('../../../../package.json');

const peerDependenciesTask = () => {
    const peers = keys(mapKeys(packageJSON.peerDependencies, (value, key) => {
        return `${key}@${value}`;
    })).join(' ');

    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {read: false})
        .pipe(prompt.confirm({
            message: 'Also install peerDependencies? (Required when starting a new project with ACE)',
            default: true
        }))
        .pipe(shell([
            `npm install -S ${peers}`
        ], {
            cwd: process.env.INIT_CWD
        }));
};

gulp.task('installPeerDeps', peerDependenciesTask);

module.exports = peerDependenciesTask;
