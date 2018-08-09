const fs = require('fs');
const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const projectPath = require('../lib/project-path');

const htmlReplaceTask = () => {
    const manifest = JSON.parse(fs.readFileSync(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/manifest.json`, 'utf8'));
    const path = global.TASK_CONFIG.htmlReplace.path;
    const cssFile = (global.TASK_CONFIG.htmlReplace.cssFileName)
        ? `${global.SETTINGS_CONFIG.css.path}/${global.TASK_CONFIG.htmlReplace.cssFileName}`
        : manifest[`${global.SETTINGS_CONFIG.css.path}/main.min.css`];
    const jsFile = (global.TASK_CONFIG.htmlReplace.jsFileName)
        ? `${global.SETTINGS_CONFIG.js.path}/${global.TASK_CONFIG.htmlReplace.jsFileName}`
        : manifest[`${global.SETTINGS_CONFIG.js.path}/${global.SETTINGS_CONFIG.js.min}`];

    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.root.index}`)
        .pipe(htmlreplace({
            css: (path) ? `${path}/${cssFile}` : cssFile,
            js: (path) ? `${path}/${jsFile}` : jsFile
        }))
        .pipe(gulp.dest(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`));
};

gulp.task('htmlReplace', htmlReplaceTask);

module.exports = htmlReplaceTask;
