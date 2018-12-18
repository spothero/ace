const {
    series,
    task,
} = require('gulp');
const requireDir = require('require-dir');

process.title = 'ace-server';

requireDir('./', {recurse: true});

const developmentClient = () => {
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
    const seq = (custom.length)
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

    return seq;
};

const developmentSSR = () => {
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
    const seq = (custom.length)
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

    return seq;
};

task('default', series(...developmentClient()));
task('ssrDev', series(...developmentSSR()));
