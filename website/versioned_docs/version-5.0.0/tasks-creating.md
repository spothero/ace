---
id: version-5.0.0-tasks-creating
title: Creating
original_id: tasks-creating
---

You can create new Gulp tasks to add to your builds if you need custom functionality that doesn't exist in ACE. Follow the steps below to make sure your task will be properly created for use within ACE.

1. If you haven't already, run scaffolding for configs (see [Extra Tasks](tasks-extra) for details).
    * The suggested directory structure for new tasks is to create a `/tasks` directory inside of the `/config` directory.
    * The suggested naming structure is `task-name.js` for the file name and `taskName` for the actual task.
1. The task is nothing more than a function that gets exported from your file. The function receives the following parameters:
    * `gulp` (Object): The internal Gulp instance.<br />
    * `projectPath` (Function): The function used by ACE internally to make sure that tasks are run from the proper directory.
        * This function typically takes a path from your settings file.
    * `SETTINGS_CONFIG` (Object): Contains the contents of your settings file.
    * `TASK_CONFIG` (Object): Contains the contents of your tasks file.
    * `cb` (Function): An optional callback to pass to the task to make it asynchronous.
    ```javascript
    module.exports = (gulp, projectPath, SETTINGS_CONFIG, TASK_CONFIG, cb) => {
        ...
    };
    ```
1. Speficy the task in `tasks.js` under the `additionalTasks` object. An example comment is provided there to get you started.
1. The task will now be available for use by the specified name you provided in the step above in the `preBuild`, `postBuild`, and `custom` arrays inside of the `taskSequence` object for any environment. See [Adding Tasks To Builds](tasks-adding) for details.

An example task to copy a file from the JS folder into the production build JS directory may look like this:

*copy-loader.js*
```javascript
module.exports = (gulp, projectPath, SETTINGS_CONFIG, TASK_CONFIG, cb) => {
    return gulp.src(`${projectPath(SETTINGS_CONFIG.src.path)}/${SETTINGS_CONFIG.src.js.path}/loader.js`)
        .pipe(gulp.dest(`${projectPath(SETTINGS_CONFIG.dist.path)}/${SETTINGS_CONFIG.src.js.path}`));
};
```

*tasks.js*
```javascript
module.exports = {
    ...,
    additionalTasks: {
        copyLoader: require('./tasks/copy-loader')
    },
    taskSequence: {
        ...,
        production: {
            preBuild: [],
            postBuild: [
                'copyLoader' // the task is now available for use here
            ]
        }
    }
};
```
