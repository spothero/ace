---
id: tasks-sprites
title: Sprites
---

There are lots of variables to consider when creating sprites which makes it extremely difficult to fully automate the generation of sprites for a specific project. ACE does its best to help you automate as much as possible and abstracts away a lot of the core setup to do this, however.

**It is highly recommended that you follow the steps below very closely, in order, for best results. Not doing so can yield unexpected results, errors, or complete failure of your build.**

## Resizing Sprite PNGs
When working with sprites you'll need a 1x and a 2x version of each transparent PNG image that you want to add to the final sprite. ACE has a built in Gulp task, aptly named `resizeSprites`, which can generate the necessary `*-1x` folders for you.

You can organize your sprites in directories using the recommended structure below.
```
├── project
|   └── sprites
|       └── [name1]-2x
|           ├── image-1.png
|           └── image-2.png
|       └── [name2]-2x
|           ├── image-1.png
|           └── image-2.png
```

Once complete, you can generate the appropriate 1x directories.
```
npm start -- resizeSprites
```
This task **should not** be run as part of your build process and will need to be initiated manually using this command whenever necessary.

This will result in the following:
```
├── project
|   └── sprites
|       └── [name1]-1x
|           ├── image-1.png
|           └── image-2.png
|       └── [name1]-2x
|           ├── image-1.png
|           └── image-2.png
|       └── [name2]-1x
|           ├── image-1.png
|           └── image-2.png
|       └── [name2]-2x
|           ├── image-1.png
|           └── image-2.png
```

Your sprite images will now be ready to add to a combined spritesheet.

## Generating Sprite Assets
Once the 1x and 2x images for each spritesheet you want to create are ready you can move on to generating the necessary assets for use in your project. You should add the `generateSprites` command to your `development` and `production` builds in the `preBuild` stage. See [Adding Tasks To Builds](tasks-adding) for details.

This generation command will do the following (for every instance of a `name` that you provide it in the settings file):
* Generate `sprite-[name].png` and `sprite-[name]@2x.png` image files that house all of the combined sprites.
* Generate `_sprites-[name]-map.scss` and `sprites-[name]-map-2x.scss` Sass files that will contain Sass map information for each sprite to be used in the Sass `sprite` mixin.
* Generate `_sprites-[name].scss` Sass files that will contain usable CSS classes to apply to DOM elements.

## The `sprite` Mixin
Before you can use the sprites in your project, you'll need to import the `sprite` mixin into your Sass build pipeline (typically where you import other mixins/utils, recommended in the `sass/common/_bootstrap.scss` file). This is where automatic generation is not entirely possible and you'll need to do this yourself. Fortunately, the actual mixin is located in this repository for your copy/paste pleasure.

[Grab the mixin](https://github.com/spothero/ace/blob/master/config/_sprites.scss)

Inspect the file closely for directions to make sure that your sprites work as intended. The `[name]` instances will correspond to the `names` array in the `settings.js` file.

## Putting It All Together
Finally, you'll have to manually import each of your generated `_sprites-[name].scss` Sass files (also recommended in `sass/common/_bootstrap.scss`) to make them available to your project.

Once done, you can render an HTML element like so (where `sprite-app-store` is an example class inside of this generated file):
```html
<div class="sprite-app-store"></div>
```
