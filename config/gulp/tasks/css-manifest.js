const {
    dest,
    src,
    task,
} = require('gulp');
const rev = require('gulp-rev');
const through = require('through2');
const modify = require('modify-filename');
const projectPath = require('../lib/project-path');

const cssManifest = () => {
    const destination = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`;

    return src(`${destination}/${global.SETTINGS_CONFIG.dist.css.path}/*.css`, {base: destination})
        .pipe(rev())
        .pipe(through.obj((file, enc, cb) => {
            // see: https://github.com/sindresorhus/gulp-rev/issues/186#issuecomment-229279896
            // don't alter the css file paths for non-production builds
            file.path = modify(file.revOrigPath, (name, ext) => {
                return `${name}${ext}`;
            });

            cb(null, file);
        }))
        .pipe(rev.manifest(`${destination}/${global.SETTINGS_CONFIG.dist.manifest.filename}`, {
            base: destination
        }))
        .pipe(dest(destination));
};

task('cssManifest', cssManifest);
