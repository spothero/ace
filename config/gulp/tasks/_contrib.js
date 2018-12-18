const {
    series,
    task,
} = require('gulp');
const updatePackageScripts = require('./scaffolding/package-scripts');
const installPeerDeps = require('./install/peer-dependencies');
const installContribDeps = require('./install/contrib-dependencies');
const scaffoldConfigs = require('./scaffolding/create-configs');
const scaffoldProject = require('./scaffolding/project');

task('contrib', series(
    updatePackageScripts,
    installPeerDeps,
    installContribDeps,
    scaffoldConfigs,
    scaffoldProject,
));
