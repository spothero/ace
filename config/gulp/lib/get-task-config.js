const fs = require('fs');
const projectPath = require('./project-path');

const getTaskConfig = () => {
    if (process.env.ACE_CONFIG_PATH) {
        return require(projectPath(process.env.ACE_CONFIG_PATH, 'tasks.js'));
    }

    const defaultConfigPath = projectPath('config/tasks.js');

    if (fs.existsSync(defaultConfigPath)) {
        return require(defaultConfigPath);
    }

    return require('../../tasks.js');
};

module.exports = getTaskConfig();
