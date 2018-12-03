---
id: version-5.0.0-tasks-home
title: Modifying
original_id: tasks-home
---

Under the hood, ACE uses Gulp to perform its task running duties. With great power comes great responsibility. As such, great care is taken to abstract away all things Gulp. The downside to this is that [creating](tasks-creating) new Gulp tasks is a bit... wonky.

## Process
The process of modifying the tasks is simplified by the fact that they all live in one central location.

1. If you haven't already, run scaffolding for configs (see the [`scaffoldConfigs`](tasks-extra#scaffoldconfigs) task for details).
1. Open the `config/tasks.js` file.
1. After modifying the file, restart your build process for the changes to take effect.

## Patterns
As it pertains to task settings in the *config/tasks.js* file, any task that takes a `pattern` will be concatenated from the root project directory.

For instance, given the pattern `'src/sass/utils/**/*'` provided to a task and the default [root path setting](settings-root/#path) of `'./'`, the final path ACE will keep internally will be `'./src/sass/utils/**/*'`. ACE does this to ensure that the path is being pulled from your project properly and not so that it is pulling the path from its own internal configuration inside of the `node_modules` directory that ACE itself is contained in.

As stated above, this applies to all task settings that have the word `pattern` in it (`clean.patterns`, `lintJS.patterns`, etc...). An example for adding new Sass watch patterns would be as follows:
```js
module.exports = {
    ...,
    watch: {
        ...,
        sassPatterns: [
            'src/sass/utils/**/*', // watch this directory as well
            '!src/sass/vendor/**/*' // ignore this directory
        ]
    },
    ...
};
```

## Notes
The following pages will explain all there is to know about tasks in ACE.
