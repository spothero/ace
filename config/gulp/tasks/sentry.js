const forIn = require('lodash/forIn');
const includes = require('lodash/includes');
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

    if (isEmpty(sentryData.organizationSlug) || isEmpty(deploySettings.authToken) || isEmpty(sentryData.projectSlug)) {
        throw new PluginError('sentry', 'You must fill in all the applicable settings for the "sentry" object in the tasks file.');
    }

    if (isEmpty(deploySettings.staticUrl) || isEmpty(deploySettings.path)) {
        throw new PluginError('sentry', 'You must fill in all the applicable settings for the "deploy" object in the settings file.');
    }

    const manifest = JSON.parse(fs.readFileSync(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/manifest.json`, 'utf8'));
    const sources = [];

    forIn(manifest, value => {
        if (includes(value, '.min.js')) {
            sources.push(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${value}`);
            sources.push(`${projectPath(global.SETTINGS_CONFIG.dist.path)}/${value.replace('.min.js', '.min.js.map')}`);
        }
    });

    return gulp.src(sources)
        .pipe(sentryRelease(`${projectPath(global.SETTINGS_CONFIG.root.path)}/package.json`, {
            DOMAIN: `${deploySettings.staticUrl}/${deploySettings.path}/js`,
            API_URL: `https://app.getsentry.com/api/0/projects/${sentryData.organizationSlug}/${sentryData.projectSlug}/`,
            API_KEY: sentryData.authToken,
            debug: true
        }).release(deploySettings.releaseVersion));
};

gulp.task('sentry', sentryTask);

module.exports = sentryTask;
