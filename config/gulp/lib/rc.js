const rc = require('rc');
const isArray = require('lodash/isArray');
const mergeWith = require('lodash/mergeWith');
const projectPath = require('./project-path');
const settingsConfig = require('./get-settings-config');

const customizer = (objValue, srcValue, key) => {
    if (isArray(objValue) && key !== 'browserslist') {
        return objValue.concat(srcValue);
    } else if (key === 'browserslist') {
        // completely override browserslist if its defined in the .rc file
        return srcValue;
    }
};

const getRCValues = defaultValues => {
    // capture the current working directory
    const workingDir = process.cwd();

    // change to the project working directory so that we can access the .acerc file from there
    process.chdir(projectPath(settingsConfig.root.path));

    // grab the .acerc file and set proper defaults
    const defaults = mergeWith(defaultValues, rc('ace'), customizer);

    // change back to ACE's working directory
    process.chdir(workingDir);

    return defaults;
};

module.exports = getRCValues;
