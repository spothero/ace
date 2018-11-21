const gulp = require('gulp');
const sequence = require('run-sequence');

const setupTask = cb => {
    sequence(
        'updatePackageScripts',
        'installPeerDeps',
        'scaffoldConfigs',
        'scaffoldProject',
        cb
    );
};

gulp.task('setup', setupTask);
