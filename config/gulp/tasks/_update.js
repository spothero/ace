const gulp = require('gulp');
const sequence = require('run-sequence');

const updateTask = cb => {
    sequence(
        'updatePackageScripts',
        'updatePeerDeps',
        'updateConfigs',
        cb
    );
};

gulp.task('update', updateTask);
