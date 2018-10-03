const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const isNil = require('lodash/isNil');
const AWS = require('aws-sdk');
const gulp = require('gulp');
const gulpS3Upload = require('gulp-s3-upload');
const sequence = require('run-sequence');
const PluginError = require('plugin-error');
const uuidV4 = require('uuid/v4');
const projectPath = require('../lib/project-path');

const getEnvironment = () => {
    const npmEnvironment = process.env.npm_lifecycle_event.split(':')[1] || 'development';

    if (npmEnvironment === 'sandbox' && isNil(process.env.SANDBOX_NAME)) {
        throw new PluginError('deploy', 'You must specify a sandbox name for sandbox deployments. See README.md for more information.');
    }

    return npmEnvironment;
};

const invalidateCloudFront = () => {
    const npmEnvironment = getEnvironment();
    const cloudfront = new AWS.CloudFront();
    const settingsPath = global.SETTINGS_CONFIG.deploy.path;
    const basePath = (!isEmpty(settingsPath)) ? `/${global.SETTINGS_CONFIG.deploy.path}` : '';
    const indexFileName = 'index.html';
    const manifestFileName = 'manifest.json';
    const indexPath = (npmEnvironment === 'sandbox')
        ? `${basePath}/sandbox/${process.env.SANDBOX_NAME}/${indexFileName}`
        : `${basePath}/${indexFileName}`;
    const manifestPath = (npmEnvironment === 'sandbox')
        ? `${basePath}/sandbox/${process.env.SANDBOX_NAME}/${manifestFileName}`
        : `${basePath}/${manifestFileName}`;
    const batchItems = [
        indexPath,
        manifestPath,
        ...global.SETTINGS_CONFIG.deploy.invalidatePaths
    ];
    const distroIds = global.SETTINGS_CONFIG.deploy[npmEnvironment].cloudFrontDistributionId;
    const params = {
        InvalidationBatch: {
            CallerReference: uuidV4(),
            Paths: {
                Quantity: batchItems.length,
                Items: batchItems
            }
        }
    };
    const distroParams = [];
    const promises = [];

    if (isArray(distroIds)) {
        distroIds.forEach(id => {
            distroParams.push({
                ...params,
                DistributionId: id,
            });
        });
    } else {
        distroParams.push({
            ...params,
            DistributionId: distroIds
        });
    }

    distroParams.forEach(distro => {
        promises.push(
            new Promise(() => {
                cloudfront.createInvalidation(distro, (err, data) => {
                    if (err) {
                        throw new PluginError('invalidate', err, {showStack: true});
                    } else {
                        console.log(data); // eslint-disable-line no-console
                    }
                });
            })
        );
    });

    return Promise.all(promises);
};

const uploadToS3 = () => {
    const s3 = gulpS3Upload();
    const npmEnvironment = getEnvironment();

    if (!['sandbox', 'staging', 'production'].includes(npmEnvironment)) {
        throw new PluginError('uploadToS3', 'Environment must be sandbox, staging, or production.');
    }

    return gulp.src([`${projectPath(global.SETTINGS_CONFIG.dist.path)}/**`])
        .pipe(s3(
            {
                Bucket: `${global.SETTINGS_CONFIG.deploy[npmEnvironment].bucket}`,
                ACL: 'public-read',
                keyTransform: relativeFilename => {
                    const basePath = `${global.SETTINGS_CONFIG.deploy.path}`;

                    return (npmEnvironment === 'sandbox')
                        ? `${basePath}/sandbox/${process.env.SANDBOX_NAME}/${relativeFilename}`
                        : `${basePath}/${relativeFilename}`;
                }
            }, {
                maxRetries: 5
            }
        ));
};

const deployTask = cb => {
    const settings = global.SETTINGS_CONFIG.deploy;
    const npmEnvironment = getEnvironment();

    if (isEmpty(settings[npmEnvironment].bucket) || isEmpty(settings[npmEnvironment].cloudFrontDistributionId)) {
        throw new PluginError('deploy', 'You must fill in all the applicable settings for the "deploy" object in the settings file. See https://github.com/spothero/ace/wiki/Deploying for details.');
    }

    sequence(
        'upload',
        'invalidate',
        cb
    );
};

gulp.task('upload', uploadToS3);
gulp.task('invalidate', invalidateCloudFront);
gulp.task('deploy', deployTask);

module.exports = deployTask;
