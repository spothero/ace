const gulp = require('gulp');
const rev = require('gulp-rev');
const sourcemaps = require('gulp-sourcemaps');
const projectPath = require('../lib/project-path');

const revisionTask = () => {
    const dest = projectPath(global.SETTINGS_CONFIG.dist.path);

    return gulp.src([
        `${projectPath(global.SETTINGS_CONFIG.dist.path)}/${global.SETTINGS_CONFIG.css.path}/*.css`,
        `${projectPath(global.SETTINGS_CONFIG.dist.path)}/${global.SETTINGS_CONFIG.js.path}/*.js`
    ], {base: dest})
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest))
        .pipe(rev.manifest('manifest.json'))
        .pipe(gulp.dest(dest));
};

gulp.task('revision', revisionTask);

module.exports = revisionTask;
