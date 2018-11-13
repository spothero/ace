const gulp = require('gulp');
const projectPath = require('../lib/project-path');

const htmlCopyTask = () => {
    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}/${global.SETTINGS_CONFIG.src.index}`)
        .pipe(gulp.dest(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`));
};

gulp.task('htmlCopy', htmlCopyTask);

module.exports = htmlCopyTask;
