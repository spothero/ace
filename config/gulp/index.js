const forEach = require('lodash/forEach');
const toPairs = require('lodash/toPairs');
const gulp = require('gulp');
const requireDir = require('require-dir');
const projectPath = require('./lib/project-path');

global.SETTINGS_CONFIG = require('./lib/get-settings-config');
global.TASK_CONFIG = require('./lib/get-task-config');

requireDir('./tasks', {recurse: true});

const customTasks = toPairs(global.TASK_CONFIG.additionalTasks);

forEach(customTasks, task => {
    gulp.task(task[0], cb => {
        return task[1](gulp, projectPath, global.SETTINGS_CONFIG, global.TASK_CONFIG, cb);
    });
});
