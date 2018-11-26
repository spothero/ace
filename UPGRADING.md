As ACE evolves, there is and will be changes to the way that project setup is structured and options are passed. New features are added in a regular cadence and the underlying technologies behind ACE are updated frequently.

This document lists noteworthy new features and breaking changes to help ease the transition when upgrading from older versions of ACE.

# <5.0.0 to 5.0.0

## New Features
### Basic Server Side Rendering Support
This should be considered an "in development" feature that is not yet production ready. ACE has added the ability to configure SSR settings for a development environment to hit the ground running with SSR. Scaffolding a project will now also scaffold the `src/server.js` file which can then be used as a starting point for SSR setups. Additional server settings are located in the new `settings.js` file as well.

You'll need to provide your own dynamic loading solution ([react-loadable](https://github.com/jamiebuilds/react-loadable), [react-universal-component](https://github.com/faceyspacey/react-universal-component), etc...) and the Babel plugin that corresponds for allowing dynamic imports. You'll also want to figure out the best way to load all chunks (if applicable) in the HTML template. The solutions listed above each have their own way(s) of doing this. Lastly, you may need to update the `webpack.server.externals` setting as well.

Production settings for SSR support are on the way in a future release.

### Code Splitting
Added ability to set `chunkFilename` for webpack client configuration.

### Adjust Webpack Client Log Levels
Added the ability to set the [clientLogLevel](https://webpack.js.org/configuration/dev-server/#devserver-clientloglevel) for a webpack dev server to control messages in DevTools on the client. This setting is in the *settings.js* file under `webpack.client.clientLogLevel` and is set to `'none'` by default.

### Optionally Write Files To Disk
Previously, ACE would write bundled files to the disk automatically during development builds which may help in debugging. There is now a new setting to control this, `webpack.client.development.writeToDisk` (`true` by default).

### Change Name of Manifest
You can now change the output filename of the manifest (`manifest.json`) using `dist.manifestFilename` in *settings.js*.

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
+ "deploy:sandbox": "ACE_DEPLOY_TYPE=sandbox npm run build && ace -- deploy",
+ "deploy:staging": "ACE_DEPLOY_TYPE=staging npm run build && ace -- deploy",
+ "deploy:production": "ACE_DEPLOY_TYPE=production npm run build && ace -- deploy",
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
The default output name of the JS bundle is now `[main]-[hash].js` instead of `bundle.js`. If your project was using the default settings, you'll want to update your `index.html` file to remove the script tag (which is now automatically injected by Webpack to the HTML template).

### Removed Revision Task
The `revision` task was no longer necessary. Webpack now takes care of versioning JS files during production builds and the `cssmin` task does the same for CSS files.

### Removed htmlReplace Task Options
The new `htmlReplace` task is an internal task and because of changes to JS/CSS files being automated and naming being determined based on original names (and through the manifest file), these options are now obsolete. As such, they have been removed from *tasks.js*.
