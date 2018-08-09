const gulp = require('gulp');
const del = require('del');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../lib/project-path');

const patterns = (global.TASK_CONFIG.clean.patterns.length)
    ? global.TASK_CONFIG.clean.patterns.map(pattern => {
        return `${projectPath(global.SETTINGS_CONFIG.root.path)}/${pattern}`;
    })
    : [];
const cleanTask = () => {
    return del([
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.css.path}/*.css`,
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.js.path}/${global.SETTINGS_CONFIG.js.output}`,
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.js.path}/${global.SETTINGS_CONFIG.js.output}.map`,
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.js.path}/*.hot-update.*`,
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/checkstyle-*.xml`,
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`,
        ...patterns
    ], {force: true})
        .then(() => {
            log(colors.red('Static assets deleted for re-creation in a new build.'));
        });
};

gulp.task('clean', cleanTask);

module.exports = cleanTask;
