const {
    series,
    task,
} = require('gulp');
const updatePackageScripts = require('./scaffolding/package-scripts');
const updatePeerDeps = require('./install/update-peer-dependencies');
const updateConfigs = require('./scaffolding/update-configs');

task('update', series(
    updatePackageScripts,
    updatePeerDeps,
    updateConfigs,
));
