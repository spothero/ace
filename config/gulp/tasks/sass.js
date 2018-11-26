const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');
const browserslist = require('../../browserslist');

const sassTask = src => {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'node_modules',
                `${projectPath(global.SETTINGS_CONFIG.root.path)}/node_modules`
            ]
        }))
        .on('error', handleErrors)
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(postcss([
            autoprefixer({
                browsers: browserslist
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}/${global.SETTINGS_CONFIG.dist.css.path}`));
};

gulp.task('sass', () => {
    return sassTask(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}/${global.SETTINGS_CONFIG.src.sass.path}/**/*.scss`);
});
