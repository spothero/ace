const gulp = require('gulp');
const revRewrite = require('gulp-rev-rewrite');
const projectPath = require('../lib/project-path');

const htmlReplaceTask = () => {
    const manifest = gulp.src(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${global.SETTINGS_CONFIG.dist.manifest.filename}`);

    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}/${global.SETTINGS_CONFIG.src.index}`)
        .pipe(revRewrite({manifest}))
        .pipe(gulp.dest(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`));
};

gulp.task('htmlReplace', htmlReplaceTask);

