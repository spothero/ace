const AWS = require('aws-sdk');
const gulp = require('gulp');
const shell = require('gulp-shell');
const gulpS3Upload = require('gulp-s3-upload');
const sequence = require('run-sequence');
const PluginError = require('plugin-error');
const uuidV4 = require('uuid/v4');
const projectPath = require('../../lib/project-path');
const pkg = require('../../../../package.json');

const deploySettings = {
    bucket: 'spothero.com-static-production.styleguide',
    cloudFrontDistributionId: 'E13YKZ29SIK8RP'
};

const generateACEDocsTask = () => {
    return shell.task([
        `cd website && npm install && npm run version ${pkg.version}`
    ], {
        cwd: process.env.INIT_CWD
    });
};

const invalidateCloudFront = () => {
    const cloudfront = new AWS.CloudFront();
    const params = {
        DistributionId: deploySettings.cloudFrontDistributionId,
        InvalidationBatch: {
            CallerReference: uuidV4(),
            Paths: {
                Quantity: 1,
                Items: [`/uniform/ace*`]
            }
        }
    };

    return new Promise(() => {
        cloudfront.createInvalidation(params, (err, data) => {
            if (err) {
                throw new PluginError('invalidateACEDocs', err, {showStack: true});
            } else {
                console.log(data); // eslint-disable-line no-console
            }
        });
    });
};

const uploadToS3 = () => {
    const s3 = gulpS3Upload();

    return gulp.src([
        `${projectPath('website/build/ace')}/**`,
        `${projectPath('website/versioned_docs')}/**`,
        `${projectPath('website/versioned_sidebars')}/**`,
        `${projectPath('website')}/versions.json`,
    ])
        .pipe(s3(
            {
                Bucket: deploySettings.bucket,
                ACL: 'public-read',
                keyTransform: relativeFilename => {
                    return `uniform/ace/${relativeFilename}`;
                }
            }, {
                maxRetries: 5
            }
        ));
};

const docsTask = cb => {
    sequence(
        'generateACEDocs',
        'uploadACEDocs',
        'invalidateACEDocs',
        cb
    );
};

gulp.task('generateACEDocs', generateACEDocsTask());
gulp.task('uploadACEDocs', uploadToS3);
gulp.task('invalidateACEDocs', invalidateCloudFront);
gulp.task('docs', docsTask);
