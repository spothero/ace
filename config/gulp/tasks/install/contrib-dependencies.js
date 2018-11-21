const gulp = require('gulp');
const shell = require('gulp-shell');
const get = require('lodash/get');
const packageJSON = require('../../../../package.json');

const contribDependenciesTask = () => {
    const deps = packageJSON.contributionDependencies.map(dep => {
        return `${dep}@${get(packageJSON.dependencies, dep)}`;
    }).join(' ');

    return shell.task([
        `npm install -D ${deps}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

gulp.task('installContribDeps', contribDependenciesTask());
