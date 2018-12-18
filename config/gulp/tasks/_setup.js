const {
    series,
    task,
} = require('gulp');
const updatePackageScripts = require('./scaffolding/package-scripts');
const installPeerDeps = require('./install/peer-dependencies');
const scaffoldConfigs = require('./scaffolding/create-configs');
const scaffoldProject = require('./scaffolding/project');

task('setup', series(
    updatePackageScripts,
    installPeerDeps,
    scaffoldConfigs,
    scaffoldProject,
));
