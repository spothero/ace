const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rev = require('gulp-rev');
const cssnano = require('cssnano');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');

const cssMinTask = () => {
    const dest = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`;

    return new Promise((resolve, reject) => {
        const vp = vinylPaths();

        gulp.src(`${dest}/${global.SETTINGS_CONFIG.dist.css.path}/*.css`, {base: dest})
            .pipe(vp)
            .pipe(postcss([
                cssnano({
                    discardComments: {
                        removeAll: true
                    }
                })
            ]))
            .on('error', handleErrors)
            .pipe(rev())
            .pipe(gulp.dest(dest))
            .pipe(rev.manifest(`${dest}/${global.SETTINGS_CONFIG.dist.manifest.filename}`, {
                base: dest
            }))
            .pipe(gulp.dest(dest))
            .on('end', () => {
                const deletePaths = [];

                vp.paths.forEach(path => {
                    deletePaths.push(path);
                    deletePaths.push(`${path}.map`);
                });

                del(deletePaths, {force: true})
                    .then(resolve)
                    .catch(reject);
            });
    });
};

gulp.task('cssMin', cssMinTask);
