---
id: version-5.0.0-tasks-adding
title: Adding To Builds
original_id: tasks-adding
---

You can add tasks to your builds, whether you've created a new task or want to use a non-pre-installed task. If adding new tasks that you've created, please make sure that you've followed the directions for [creating tasks](tasks-creating) to define the task correctly or it will fail your build.

The `tasks.js` file contains a `taskSequence` that allows you to add `preBuild`, `postBuild`, or `custom` tasks to `development`, `test`, and `production` builds.

The `preBuild` tasks run directly after the `clean` task and before compilation of JS and Sass (except in `development` and `test` since JS compilation happens during the `devServerClient` task which is a daemon).

The `postBuild` tasks run before any daemons (`watch`, `devServerClient`) during `development` and `test` and directly at the end of `production` builds.

The `custom` tasks will override any default task settings and you will be responsible for calling all tasks manually.

You can add tasks to the `preBuild`, `postBuild`, and `custom` arrays in the order you want them to be executed.

```javascript
module.exports = {
    ...,
    taskSequence: {
        development: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
        test: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
        production: {
            preBuild: [],
            postBuild: [
                'sentry'
            ],
            custom: []
        }
    }
};
```

You can optionally surround a given set of tasks in an array within these arrays if they should be run asynchronously (that is to say, order execution doesn't matter).

```javascript
module.exports = {
    ...,
    taskSequence: {
        development: {
            preBuild: [
                'sequencedTask',
                [ // these will run at the same time after `sequencedTask`
                    'sprites',
                    'images'
                ],
                'sequencedTaskEnd' // this will run after all of the above have finished
            ],
            postBuild: [],
            custom: []
        },
        test: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
        production: {
            preBuild: [],
            postBuild: [
                'sentry'
            ],
            custom: []
        }
    }
};
```

## Custom Task Runs
As stated above, if you need a completely custom ordering to your task runs, you can use the `custom` array to define them. **Using the `custom` tasks array overrides any default ACE task sequence and you'll have to re-define all of the tasks you want to run manually.**  Here is an example with a custom `serverProxy` task.

```javascript
module.exports = {
    ...,
    taskSequence: {
        development: {
            preBuild: [],
            postBuild: [],
            custom: [
                'clean',
                'sass',
                'lintSass',
                'watch',
                [
                    'devServerClient',
                    'serviceProxy'
                ]
            ]
        },
        test: {
            preBuild: [],
            postBuild: [],
            custom: []
        },
        production: {
            preBuild: [],
            postBuild: [
                'sentry'
            ],
            custom: []
        }
    }
};
```

As you can see, the `clean`, `sass`, `lintSass`, `watch`, and `devServerClient` tasks (which are internal to ACE) had to be re-defined in the `development` tasks to ensure they still run while `serverProxy` was added in a specific spot alongside `devServerClient`. This is a very powerful mechanism that allows you to define the task order any way you like!
