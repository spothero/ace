const gulp = require('gulp');
const sequence = require('run-sequence');

const contribTask = cb => {
    sequence(
        'updatePackageScripts',
        'installPeerDeps',
        'installContribDeps',
        'scaffoldConfigs',
        'scaffoldProject',
        cb
    );
};

gulp.task('contrib', contribTask);
