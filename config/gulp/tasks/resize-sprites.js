const gulp = require('gulp');
const del = require('del');
const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../lib/project-path');

const resizeSpritesTask = () => {
    const spritesSrc = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}/${global.SETTINGS_CONFIG.src.sprites.srcPath}`;

    log(colors.red('Removed prior *-1x folders for re-creation of new ones based on *-2x sprites.'));

    del([`${spritesSrc}/*-1x`], {force: true})
        .then(paths => {
            gulp.src(`${spritesSrc}/*-2x/*.png`)
                .pipe(imageResize({
                    width: '50%',
                    height: '50%'
                }))
                .pipe(rename(path => {
                    path.dirname = `${path.dirname.substring(0, path.dirname.length - 3)}-1x`;
                }))
                .pipe(gulp.dest(spritesSrc));
        });
};

gulp.task('resizeSprites', resizeSpritesTask);
