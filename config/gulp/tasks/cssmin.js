const {
    dest,
    src,
    task,
} = require('gulp');
const postcss = require('gulp-postcss');
const rev = require('gulp-rev');
const cssnano = require('cssnano');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');

const cssMin = () => {
    const destination = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`;

    return new Promise((resolve, reject) => {
        const vp = vinylPaths();

        src(`${destination}/${global.SETTINGS_CONFIG.dist.css.path}/*.css`, {base: destination})
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
            .pipe(dest(destination))
            .pipe(rev.manifest(`${destination}/${global.SETTINGS_CONFIG.dist.manifest.filename}`, {
                base: destination
            }))
            .pipe(dest(destination))
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

task('cssMin', cssMin);
