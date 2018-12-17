---
id: upgrading-v6
title: 5.x.x to 6.x.x
---

ACE v6 is centered around server-side rendering (SSR).

## New Features
### SSR HTML Index
Added *src/index-ssr.html* to scaffolded project files to align with new server setup. After scaffolding a project that is meant to be SSR, it is safe (and recommended) to delete the *src/index.html* file and rename this file to the same name so that it can be used as the template the server loads.

Also updated the actual *src/server.js* scaffolded file to automatically read the manifest and pull in file paths for initial CSS and JS files and add that information to the server rendered HTML markup.

Further customization of these files is recommended for your project setup. These are meant to be a starting point to get SSR running.

## Breaking Changes
### SSR Package Script Update
The script that starts the SSR flow has been updated in the *package.json* file.

```diff
- "start:ssr": "ACE_NPM_EVENT=start ace -- devServerSSR",
+ "start:ssr": "ACE_NPM_EVENT=start ACE_ENVIRONMENT=server ace -- ssrDev",
```

### Server Webpack Port
The setting for `webpack.server.port` was changed from `9001` to `9000` to align with how the client works in non-SSR environments.

### Task Sequences
Prior to SSR being introduced, tasks ran only on the client. ACE needed a way to distinguish which task sequences should be run on the client versus the server.

*tasks.js*
```diff
- taskSequence: {
-     development: {
-         preBuild: [],
-         postBuild: [],
-         custom: []
-     },
-     test: {
-         preBuild: [],
-         postBuild: [],
-         custom: []
-     },
-     production: {
-         preBuild: [],
-         postBuild: [],
-         custom: []
-     },
- }
+ taskSequence: {
+     client: {
+         development: {
+             preBuild: [],
+             postBuild: [],
+             custom: []
+         },
+         test: {
+             preBuild: [],
+             postBuild: [],
+             custom: []
+         },
+         production: {
+             preBuild: [],
+             postBuild: [],
+             custom: []
+         },
+     },
+     server: {
+         development: {
+             preBuild: [],
+             postBuild: [],
+             custom: []
+         },
+     },
+ }
```

### Manifest Filename
To allow for future expansion to possibilities with the manifest, it has been moved in the settings file.

*settings.js*
```diff
dist: {
    ...
-   manifestFilename: 'manifest.json',
+   manifest: {
+       filename: 'manifest.json',
+   },
    ...
},
```
