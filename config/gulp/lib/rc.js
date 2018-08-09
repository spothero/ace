const rc = require('rc');
const projectPath = require('./project-path');
const settingsConfig = require('./get-settings-config');

const getRCValues = defaultValues => {
    // capture the current working directory
    const workingDir = process.cwd();

    // change to the project working directory so that we can access the .acerc file from there
    process.chdir(projectPath(settingsConfig.root.path));

    // grab the .acerc file and set proper defaults
    const defaults = rc('ace', defaultValues);

    // change back to ACE's working directory
    process.chdir(workingDir);

    return defaults;
};

module.exports = getRCValues;
