const forIn = require('lodash/forIn');
const isEmpty = require('lodash/isEmpty');
const fs = require('fs');
const gulp = require('gulp');
const sentryRelease = require('gulp-sentry-release');
const PluginError = require('plugin-error');
const projectPath = require('../lib/project-path');
const getRCValues = require('../lib/rc');

const sentryTask = () => {
    const sentryData = global.TASK_CONFIG.sentry;
    const deploySettings = global.SETTINGS_CONFIG.deploy;

    // check .acerc to determine if values were provided there instead of the settings objects
    if (isEmpty(sentryData.organizationSlug)) {
        sentryData.organizationSlug = (getRCValues().sentry) ? getRCValues().sentry.organizationSlug : null;
    }

    if (isEmpty(sentryData.authToken)) {
        sentryData.authToken = (getRCValues().sentry) ? getRCValues().sentry.authToken : null;
    }

    if (isEmpty(deploySettings.staticUrl)) {
        deploySettings.staticUrl = (getRCValues().deploy) ? getRCValues().deploy.staticUrl : null;
    }

    if (isEmpty(sentryData.organizationSlug) || isEmpty(sentryData.authToken) || isEmpty(sentryData.projectSlug)) {
        throw new PluginError('sentry', 'You must fill in all the applicable settings for the "sentry" object in the tasks file.');
    }

    const manifest = JSON.parse(fs.readFileSync(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${global.SETTINGS_CONFIG.dist.manifest.filename}`, 'utf8'));
    const sources = [];

    forIn(manifest, value => {
        if (value.endsWith('.js')) {
            sources.push(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${value}`);
            sources.push(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${value.replace('.js', '.js.map')}`);
        }
    });

    return gulp.src(sources)
        .pipe(sentryRelease(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {
            DOMAIN: (!isEmpty(deploySettings.staticUrl) && !isEmpty(deploySettings.path))
                ? `${deploySettings.staticUrl}/${deploySettings.path}/js`
                : '',
            API_URL: `https://app.getsentry.com/api/0/projects/${sentryData.organizationSlug}/${sentryData.projectSlug}/`,
            API_KEY: sentryData.authToken,
            debug: true
        }).release(deploySettings.releaseVersion));
};

gulp.task('sentry', sentryTask);
