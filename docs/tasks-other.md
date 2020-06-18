---
id: tasks-other
title: Others
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
