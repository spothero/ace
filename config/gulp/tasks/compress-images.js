const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const projectPath = require('../lib/project-path');

const compressImagesTask = () => {
    gulp.src(`${projectPath(global.SETTINGS_CONFIG.src.path)}/${global.SETTINGS_CONFIG.src.img.path}/**/*`)
        .pipe(imagemin([
            imagemin.jpegtran({progressive: global.TASK_CONFIG.compressImages.jpg.progressive}),
            imagemin.optipng({optimizationLevel: global.TASK_CONFIG.compressImages.png.optimizationLevel})
        ]))
        .pipe(gulp.dest(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${global.SETTINGS_CONFIG.src.img.path}`));
};

gulp.task('compressImages', compressImagesTask);
