const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');

const cssMinTask = () => {
    return gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.css.path}/*.css`)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss([
            cssnano({
                discardComments: {
                    removeAll: true
                }
            })
        ]))
        .on('error', handleErrors)
        .pipe(gulp.dest(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}/${global.SETTINGS_CONFIG.css.path}`));
};

gulp.task('cssMin', cssMinTask);

module.exports = cssMinTask;
