---
id: version-5.0.0-tasks-overriding
title: Overriding Defaults
original_id: tasks-overriding
---

You can override any of ACE's [Default Tasks](default-tasks) by simply naming your task with the same name and following the [Creating New Tasks](tasks-creating) guide. If you do so, you only need to include it in the `additionalTasks` object with the given name and not have to add it to the `taskSequence` as it will take the spot of the default task automatically.

## Contrived Example
As a contrived example, you want to override the `lintSass` task that is internal to ACE by default. Here are the steps you'd take to do this:

### 1. Create the task file
Follow the [Creating New Tasks](tasks-creating) guide to create your new task file. Here is what our example looks like:

*/config/tasks/lint-sass.js*
```javascript
module.exports = (gulp, projectPath, SETTINGS_CONFIG, TASK_CONFIG, cb) => {
    return gulp.src(`${projectPath(SETTINGS_CONFIG.js.path)}/main.js`)
        .pipe(gulp.dest(`${projectPath(SETTINGS_CONFIG.dist.path)}/${SETTINGS_CONFIG.js.path}`));
};
```

### 2. Modify additional tasks
Next, pop open `/config/tasks.js` and find the `additionalTasks` object. Modify it to look like this:
```javascript
additionalTasks: {
    lintSass: require('./tasks/lint-sass')
}
```

Your task will now take precedence to the internal `lintSass` task and will execute instead of the default task.

You can see the order in the sequence where each task is being executed by looking at the corresponding source files of each build type.
* [Development](https://github.com/spothero/ace/blob/master/config/gulp/tasks/_default.js)
* [Testing](https://github.com/spothero/ace/blob/master/config/gulp/tasks/_test.js)
* [Production](https://github.com/spothero/ace/blob/master/config/gulp/tasks/_production.js)
