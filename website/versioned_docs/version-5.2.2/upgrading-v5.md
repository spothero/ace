---
id: version-5.2.2-upgrading-v5
title: <5.0.0 to 5.x.x
original_id: upgrading-v5
---

The fifth version of ACE brings the largest update to date.

## New Features
### Basic Server Side Rendering Support
This should be considered an "in development" feature that is not yet production ready. ACE has added the ability to configure SSR settings for a development environment to hit the ground running with SSR. Scaffolding a project will now also scaffold the `src/server.js` file which can then be used as a starting point for SSR setups. Additional server settings are located in the new `settings.js` file as well.

You'll need to provide your own dynamic loading solution ([react-loadable](https://github.com/jamiebuilds/react-loadable), [react-universal-component](https://github.com/faceyspacey/react-universal-component), etc...) and the Babel plugin that corresponds for allowing dynamic imports. You'll also want to figure out the best way to load all chunks (if applicable) in the HTML template. The solutions listed above each have their own way(s) of doing this. Lastly, you may need to update the `webpack.server.externals` setting as well.

Production settings for SSR support are on the way in a future release.

### Code Splitting
Added ability to set `chunkFilename` for webpack client configuration. A full [guide on code splitting](docs-code-splitting) is available.

### Client Bundle Analyzation
Added optional bundle analyzation for client JS bundles using [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer). You can set this up in the *settings.js* file using `webpack.client.[development/production].analyze`. It's enabled by passing an options object (disabled by default).

### Adjust Webpack Client Log Levels
Added the ability to set the [clientLogLevel](https://webpack.js.org/configuration/dev-server/#devserver-clientloglevel) for a webpack dev server to control messages in DevTools on the client. This setting is in the *settings.js* file under `webpack.client.clientLogLevel` and is set to `'none'` by default.

### Optionally Write Files To Disk
Previously, ACE would write bundled files to the disk automatically during development builds which may help in debugging. There is now a new setting to control this, `webpack.client.development.writeToDisk` (`true` by default).

### Add Webpack Sizing Info
Compilation of webpack bundles now includes sizing information to show how the bundle sizes change build over build when gzipped.

### Change Name of Manifest
You can now change the output filename of the manifest (`manifest.json`) using `dist.manifestFilename` in *settings.js*.

### New Documentation Site
You're reading it. Ain't it fresh?

## Breaking Changes
### Refactored Settings & Code File Structure
In preparation for new features, the file structure needed to be changed to allow easier long term maintenance. Along with it, the *settings.js* file was also updated so that the settings make sense to the new setup. We understand this is not a small change and we did not make this lightheadrtedly. Unfortunately, the prior structure did not allow for easy expansion and additions and we're confident the new structure will bring an easier way to deal with enhancements.

In the short term, its best to either run the update process or scaffold a new ACE project and update the files/configuration from the old format as necessary.

### Removed `concurrently` Package Usage
In prior versions when running Cypress through `npm test`, the Cypress UI would show a warning that the server `baseUrl` could not be verified. The `concurrently` package has been replaced with `wait-on` so that Cypress is not run until the webpack server has spun up to avoid that warning.

This renders the use of the `concurrently` package obsolete and it is no longer installed as part of ACE's dependencies. If your project depended on it being installed, you must now install it yourself directly as a `devDependency`.

### New Required Environment Variables
ACE previously parsed the `npm_lifecycle_event` to try and figure out what a user was running for them. This proved to be brittle as more and more scripts were added on and was no longer a reliable way of managing what the true intention of a script was.

*package.json*
```diff
- "start": "ace",
- "test": "concurrently --kill-others \"ace -- test\" \"npm run cypress:open\"",
- "build": "ace -- production",
- "deploy:sandbox": "npm run build && ace -- deploy",
- "deploy:staging": "npm run build && ace -- deploy",
- "deploy:production": "npm run build && ace -- deploy",
+ "start": "ACE_NPM_EVENT=start ace",
+ "test": "ACE_NPM_EVENT=test ace -- test & wait-on http://localhost:3000 && npm run cypress:open",
+ "build": "ACE_NPM_EVENT=build ace -- production",
+ "deploy:sandbox": "npm run build && ACE_DEPLOY_TYPE=sandbox ace -- deploy",
+ "deploy:staging": "npm run build && ACE_DEPLOY_TYPE=staging ace -- deploy",
+ "deploy:production": "npm run build && ACE_DEPLOY_TYPE=production ace -- deploy",
```

These changes provide an easier way to identify intentions and give developers additional environment variables to check for in their own processes.

### Removed Internal Cypress Commands
The `cypressOpen` and `cypressRun` commands that package scripts previously used have been removed in favor of calling Cypress directly. Not calling the scripts directly through `package.json` was causing improper exit codes to be reported to tasks that depended on failing tests to stop further execution.

*package.json*
```diff
- "cypress:open": "ace -- cypressOpen",
- "cypress:run": "ace -- cypressRun",
+ "cypress:open": "ace -- generateWebpackSettings && cypress open",
+ "cypress:run": "ace -- generateWebpackSettings && cypress run",
```

### Webpack Proxy Settings
Prior versions used an array of proxy name/value pairs under the `proxies` key to add proxy information to webpack's dev server. This was limiting and did not allow for all the possibilities that webpack offers by default. The property name in settings has been changed and the format is now passed straight through as the original webpack configuration of [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

*settings.js*
```diff
module.exports = {
    webpack: {
+       client: {
            ...,
            development: {
                historyApiFallback: true,
-               proxies: [
-                   {
-                       path: '/api/v1',
-                       target: `http://${hostname}:8000`
-                   }
-               ],
+               proxy: {
+                   '/api/v1': `http://${hostname}:8000`
+               },
                sourceMap: 'cheap-module-source-map'
            },
        },
        ...,
    },
};

```

### Default JS Bundle Renamed
The default output name of the JS bundle is now `[main]-[hash].js` instead of `bundle.js`. If your project was using the default settings, you'll want to update your `index.html` file to remove the script tag (which is now automatically injected by Webpack to the HTML template) and now includes some markup to help generate proper CSS file paths as well.

### Removed Revision Task
The `revision` task was no longer necessary. Webpack now takes care of versioning JS files during production builds and the `cssmin` task does the same for CSS files.

### Removed htmlReplace Task Options
The new `htmlReplace` task is an internal task and because of changes to JS/CSS files being automated and naming being determined based on original names (and through the manifest file), these options are now obsolete. As such, they have been removed from *tasks.js*.

### Update generateBabelrc Task
Previously, setting `browserslist` and `babel` settings in *.acerc* files completely overrode these settings internally. The new behavior is to still completely override the `browserslist` but recursively merge the `babel` settings since those are dependent on everything running smoothly. By passing options to `babel`, you can now simply add on other presets or plugins you may need and no longer have to manage ALL of the overridden settings for Babel in your project.
