const fs = require('fs');
const projectPath = require('./project-path');

const getSettingsConfig = () => {
    if (process.env.ACE_CONFIG_PATH) {
        return require(projectPath(process.env.ACE_CONFIG_PATH, 'settings.js'));
    }

    const defaultSettingsPath = projectPath('config/settings.js');

    if (fs.existsSync(defaultSettingsPath)) {
        return require(defaultSettingsPath);
    }

    return require('../../settings.js');
};

module.exports = getSettingsConfig();
