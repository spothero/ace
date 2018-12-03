---
id: version-5.0.0-tasks-other
title: Others
original_id: tasks-other
---

ACE also ships with some extra tasks that are not part of a build by default. These tasks are outlined below and can sometimes be useful to help with other tasks you may need to perform during your build. See [Adding Tasks To Builds](tasks-adding) for details on how to make them part of your build process.

### `compressImages` *(production)*
Compresses images in the source folder for production environments in the `dist` folder.

*Options*<br />
`jpg.progressive` (Boolean): Enable lossless conversion [progressive](https://github.com/imagemin/imagemin-jpegtran#progressive).<br />
`png.optimizationLevel` (Number): [Optimization level](https://github.com/imagemin/imagemin-optipng#optimizationlevel) to pass to OptiPNG.

### `generateSprites` *(development, production)*
Generates the necessary PNG and Sass assets for using sprites. See [Generating Sprite Assets](tasks-sprites#generating-sprite-assets) for details.

### `resizeSprites` *(development)*
Resizes `*-2x` directories with sprite PNGs in them to create `*-1x` versions.

**NOTE:** This task should not be run during a build pipeline. See [Resizing Sprite PNGs](tasks-sprites#resizing-sprite-pngs) for details.

### `sentry` *(production)*
Uploads minified JS files and source maps to Sentry for easy attribution in error logging. The source maps also allow Sentry to display non-uglified JS code in the UI for easier debugging.

*Options*<br />
`projectSlug` (String): The project in Sentry to send error logs to (**required**).<br />
`organizationSlug` (String): The organization to attribute the errors to (**required**).<br />
`authToken` (String): The Sentry authorization token (**required**).

This task also requires that all deploy settings be set to function properly.
