const gulp = require('gulp');
const sequence = require('run-sequence');

process.title = 'ace-server';

const developmentClientTask = cb => {
    const {
        taskSequence: {
            client: {
                development: {
                    preBuild,
                    postBuild,
                    custom
                }
            }
        }
    } = global.TASK_CONFIG;
    const seq = (custom && custom.length)
        ? custom
        : [
            'clean',
            ...preBuild,
            'sass',
            'cssManifest',
            'lintSass',
            ...postBuild,
            'watch',
            'devServerClient'
        ];

    sequence(...seq, cb);
};

const developmentSSRTask = cb => {
    const {
        taskSequence: {
            server: {
                development: {
                    preBuild,
                    postBuild,
                    custom
                }
            }
        }
    } = global.TASK_CONFIG;
    const seq = (custom && custom.length)
        ? custom
        : [
            'clean',
            ...preBuild,
            'sass',
            'cssManifest',
            'lintSass',
            ...postBuild,
            'watch',
            'devServerSSR'
        ];

    sequence(...seq, cb);
};

gulp.task('default', developmentClientTask);
gulp.task('ssrDev', developmentSSRTask);
