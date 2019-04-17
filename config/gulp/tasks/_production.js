const gulp = require('gulp');
const sequence = require('run-sequence');

const productionClientTask = cb => {
    const {
        taskSequence: {
            client: {
                production: {
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
            'cssMin',
            'webpackClient',
            'htmlReplace',
            ...postBuild
        ];

    sequence(...seq, cb);
};

const productionSSRTask = cb => {
    const {
        taskSequence: {
            server: {
                production: {
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
            'cssMin',
            'webpackSSR',
            'htmlReplace',
            ...postBuild
        ];

    sequence(...seq, cb);
};

gulp.task('production', productionClientTask);
gulp.task('ssrProduction', productionSSRTask);
