const fs = require('fs');
const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const isNil = require('lodash/isNil');
const projectPath = require('../../lib/project-path');

const packageScriptsTask = cb => {
    const pkgFile = `${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`;

    fs.readFile(pkgFile, {encoding: 'utf8'}, (readError, data) => {
        if (readError) { console.log(readError); } // eslint-disable-line no-console

        const jsonData = JSON.parse(data);
        const startScript = 'ACE_NPM_EVENT=start ace';
        const testScript = 'ACE_NPM_EVENT=test ace -- test & wait-on http://localhost:3000 && npm run cypress:open';
        const cypressOpenScript = 'ace -- generateWebpackSettings && cypress open';
        const cypressRunScript = 'ace -- generateWebpackSettings && cypress run';
        const buildScript = 'ACE_NPM_EVENT=build ace -- production';
        const deploySandboxScript = 'ACE_DEPLOY_TYPE=sandbox npm run build && ace -- deploy';
        const deployStagingScript = 'ACE_DEPLOY_TYPE=staging npm run build && ace -- deploy';
        const deployProductionScript = 'ACE_DEPLOY_TYPE=production npm run build && ace -- deploy';
        let msg = 'You have existing scripts that ACE will overwrite.';
        let willOverride = false;

        if (!isNil(jsonData.scripts.start) && jsonData.scripts.start !== startScript) {
            msg += `\nCurrent "start" script will be saved as "start-backup".`;
            jsonData.scripts['start-backup'] = jsonData.scripts.start;
            willOverride = true;
        }

        jsonData.scripts.start = startScript;

        if (!isNil(jsonData.scripts.test) && jsonData.scripts.test !== testScript) {
            msg += `\nCurrent "test" script will be saved as "test-backup".`;
            jsonData.scripts['test-backup'] = jsonData.scripts.test;
            willOverride = true;
        }

        jsonData.scripts.test = testScript;

        if (!isNil(jsonData.scripts['cypress:open']) && jsonData.scripts['cypress:open'] !== cypressOpenScript) {
            msg += `\nCurrent "cypress:open" script will be saved as "cypress:open-backup".`;
            jsonData.scripts['cypress:open'] = jsonData.scripts.cypressOpenScript;
            willOverride = true;
        }

        jsonData.scripts['cypress:open'] = cypressOpenScript;

        if (!isNil(jsonData.scripts['cypress:run']) && jsonData.scripts['cypress:run'] !== cypressRunScript) {
            msg += `\nCurrent "cypress:run" script will be saved as "cypress:run-backup".`;
            jsonData.scripts['cypress:run'] = jsonData.scripts.cypressRunScript;
            willOverride = true;
        }

        jsonData.scripts['cypress:run'] = cypressRunScript;

        if (!isNil(jsonData.scripts.build) && jsonData.scripts.build !== buildScript) {
            msg += `\nCurrent "build" script will be saved as "build-backup".`;
            jsonData.scripts['build-backup'] = jsonData.scripts.build;
            willOverride = true;
        }

        jsonData.scripts.build = buildScript;

        if (!isNil(jsonData.scripts['deploy:sandbox']) && jsonData.scripts['deploy:sandbox'] !== deploySandboxScript) {
            msg += `\nCurrent "deploy:sandbox" script will be saved as "deploy:sandbox-backup".`;
            jsonData.scripts['deploy:sandbox-backup'] = jsonData.scripts['deploy:sandbox'];
            willOverride = true;
        }

        jsonData.scripts['deploy:sandbox'] = deploySandboxScript;

        if (!isNil(jsonData.scripts['deploy:staging']) && jsonData.scripts['deploy:staging'] !== deployStagingScript) {
            msg += `\nCurrent "deploy:staging" script will be saved as "deploy:staging-backup".`;
            jsonData.scripts['deploy:staging-backup'] = jsonData.scripts['deploy:staging'];
            willOverride = true;
        }

        jsonData.scripts['deploy:staging'] = deployStagingScript;

        if (!isNil(jsonData.scripts['deploy:production']) && jsonData.scripts['deploy:production'] !== deployProductionScript) {
            msg += `\nCurrent "deploy:production" script will be saved as "deploy:production-backup".`;
            jsonData.scripts['deploy:production-backup'] = jsonData.scripts['deploy:production'];
            willOverride = true;
        }

        jsonData.scripts['deploy:production'] = deployProductionScript;

        if (willOverride) {
            log(colors.red(msg));
        }

        fs.writeFile(pkgFile, JSON.stringify(jsonData, null, 2), writeError => {
            if (writeError) { return console.log(writeError); } // eslint-disable-line no-console

            cb();
        });
    });
};

gulp.task('updatePackageScripts', packageScriptsTask);

module.exports = packageScriptsTask;
