---
id: settings-src
title: Source
---

**key:** `src`

## `path`
The base path for the source files.

**default:**
`'src'`

## `index`
The index HTML file, where CSS replacement will happen for the `htmlReplace` task as well as Browsersync watching for changes and reloading.

**default:**
`'index.html'`

## `img`
Settings to control images.

### `path`
The base path to the source images directory.

**default:**
`'img'`

## `js`
Settings to control Javascript.

### `path`
The base path to the source Javascript directory where `.js/.jsx` files will be watched for transpilation during development.

**default:**
`'js'`

## `sass`
Settings to control Sass.

### `path`
The base path to the source Sass directory where `.scss` files will be watched for compilation during development.

**default:**
`'sass'`

## `sprites`
Settings to control [sprites](tasks-sprites).

### `srcPath`
The base path to the source sprites directory (which should contain *-1x and *-2x directories).

**default:**
`'sprites'`

### `outputPath`
The path to output generated combined sprite images which will be appended to `img.path` above.

**example:**
`'img/sprites'`

**default:**
`'sprites'`

### `sassMapOutputPath`
The path to output generated Sass sprite map files which will be appended to `sass.path` above.

**example:**
`'/sass/utils/sprites'`

**default:**
`'utils/sprites'`

### `sassSpritesOutputPath`
The path to output generated Sass sprite files (these hold actual sprite classes and get imported into your final Sass build) which will be appended to `sass.path` above.

**example:**
`'/sass/common/sprites'`

**default:**
`'common/sprites'`

### `names`
An array of the directory names (without the -1x or -2x) where singular sprite images originate which will determine output sprite image name, output sprite Sass file name, and output CSS sprite map names.
