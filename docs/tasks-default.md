---
id: tasks-default
title: Defaults
---

ACE automatically runs a set of default Gulp tasks to help with project builds. You can modify certain tasks in the generated `tasks.js` file to add and/or change some behaviors.

**NOTE:** Tasks that have pattern file settings will start from the root project directory. ACE will take care of properly pathing the patterns internally into its own tasks.

For instance, if you want to clean an extra directory, you can set the following in `tasks.js`:
```javascript
module.exports = {
    ...,
    clean: {
        patterns: [
            'sprites/generated/**/*.png'
        ]
    },
    ...
};
```

This will delete any `.png` files in `[project root]/sprites/generated/*`;

***The build environments that the tasks are supported in are listed in parentheses.***

### `clean` *(development, production)*
Removes generated CSS and bundled JS files before a new build. Also cleans up `*.hot-update` files, `checkstyle-*` linter generated files, and removes the production built directory if it exists.

*Options*<br />
`patterns` (Array): Glob patterns to add to the default deletion items.

### `cssManifest` *(development)*
Adds the local CSS file paths to the manifest.

*Options*<br />
N/A

### `cssMin` *(production)*
Compiles Sass files for a production build, including minification and revisioning, and adds the key/value pair to the manifest.

*Options*<br />
Most of the changes to this task will happen through modifying the settings. See [the process](settings-home#process) for details.

### `devServerClient` *(development)*
Runs a Node server for local development purposes for the client. `webpack-dev-server` is used under the hood to serve up and transpile JS, add hot reloading, CSS live injection, and more. This task is a daemon.

*Options*<br />
Most of the changes to this task will happen through modifying the settings. See [the process](settings-home#process) for details.

### `htmlReplace` *(production)*
Automatically replaces the path in the `index.html` file for the minified CSS files during a build.

*Options*<br />
N/A

**NOTE:** This task is designed to be used when only one CSS file is generated during the build. If using multiple CSS files that are compiled during builds, a custom HTML path rewrite task will need to be created.


### `lintJs` *(development, production)*
Lints JS files based on the ESLint configuration specified.

*Options*<br />
`patterns` (Array): Glob patterns to add to the default linted items.

### `lintSass` *(development, production)*
Lints Sass files based on the Stylelint configuration specified.

*Options*<br />
`patterns` (Array): Glob patterns to add to the default linted items.

### `sass` *(development, production)*
Compiles Sass files to CSS.

*Options*<br />
N/A

### `watch` *(development)*
Watches Sass and JS files. Modified Sass and JS files are automatically compiled and linted on save. This task is a daemon.

*Options*<br />
`jsPatterns` (Array): Glob patterns to add to the default JS files being watched.<br />
`sassPatterns` (Array): Glob patterns to add to the default Sass files being watched.

### `webpack` *(production)*
Compiles JS files for a production build, including minification/uglifying. Produces source maps for use in tools that use them (like Sentry).

*Options*<br />
Most of the changes to this task will happen through modifying the settings. See [the process](settings-home#process) for details.
