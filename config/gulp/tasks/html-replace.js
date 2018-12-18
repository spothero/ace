const {
    dest,
    src,
    task,
} = require('gulp');
const revRewrite = require('gulp-rev-rewrite');
const projectPath = require('../lib/project-path');

const htmlReplace = () => {
    const manifest = src(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${global.SETTINGS_CONFIG.dist.manifest.filename}`);

    return src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}/${global.SETTINGS_CONFIG.src.index}`)
        .pipe(revRewrite({manifest}))
        .pipe(dest(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.dist.path}`));
};

task('htmlReplace', htmlReplace);

