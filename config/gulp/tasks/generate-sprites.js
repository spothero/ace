const fs = require('fs');
const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const log = require('fancy-log');
const colors = require('ansi-colors');
const stream = require('merge-stream')();
const projectPath = require('../lib/project-path');

const padding = 5;
const cssTemplate = './spritesmith.template.mustache';

const generateSpritesTask = () => {
    const spriteSrc = global.SETTINGS_CONFIG.sprites.srcPath;
    const spriteDest = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.img.path}/${global.SETTINGS_CONFIG.sprites.outputPath}`;
    const sassDest = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.sass.path}/${global.SETTINGS_CONFIG.sprites.sassMapOutputPath}`;
    const spriteNames = global.SETTINGS_CONFIG.sprites.names;
    const spriteIds = {};

    spriteNames.forEach(name => {
        spriteIds[name] = [];

        const retina = gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${spriteSrc}/${name}-2x/*.png`)
            .pipe(spritesmith({
                imgName: `sprite-${name}@2x.png`,
                cssName: `_sprites-${name}-map-2x.scss`,
                cssTemplate,
                cssOpts: {
                    sprite_type: `${name}-2x` // eslint-disable-line camelcase
                },
                cssVarMap: sprite => {
                    spriteIds[name].push(sprite.name);
                },
                padding
            }));
        const retinaImageStream = retina.img.pipe(gulp.dest(spriteDest));
        const retinaCSSStream = retina.css.pipe(gulp.dest(sassDest));
        const regular = gulp.src(`${projectPath(global.SETTINGS_CONFIG.root.path)}/${spriteSrc}/${name}-1x/*.png`)
            .pipe(spritesmith({
                imgName: `sprite-${name}.png`,
                cssName: `_sprites-${name}-map.scss`,
                cssTemplate,
                cssOpts: {
                    sprite_type: name // eslint-disable-line camelcase
                },
                padding
            }));
        const regularImageStream = regular.img.pipe(gulp.dest(spriteDest));
        const regularCSSStream = regular.css.pipe(gulp.dest(sassDest));

        stream.add(retinaImageStream);
        stream.add(retinaCSSStream);
        stream.add(regularImageStream);
        stream.add(regularCSSStream);
    });

    stream.on('end', () => {
        log(colors.yellow(`Combined sprite @1x and @2x images have been generated in ${colors.green(spriteDest)}.`));
        log(colors.yellow(`Sass map information files have been generated in ${colors.green(sassDest)}.`));

        spriteNames.forEach(name => {
            const sassSpritesOutputPath = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.sass.path}/${global.SETTINGS_CONFIG.sprites.sassSpritesOutputPath}`;
            const sassFileName = `${sassSpritesOutputPath}/_sprites-${name}.scss`;

            if (!fs.existsSync(sassSpritesOutputPath)) {
                fs.mkdirSync(sassSpritesOutputPath);
            }

            const sassStream = fs.createWriteStream(sassFileName);
            let spriteStr = '';

            spriteIds[name].forEach(id => {
                spriteStr += `.sprite-${id} {\n    @include sprite("${id}", "${name}");\n}\n\n`;
            });

            sassStream.write(spriteStr, 'utf8');
            sassStream.on('finish', () => {
                log(colors.yellow(`Created ${colors.green(sassFileName)}. This file should be imported into your "_sprites.scss" mixin.`));
                log(colors.yellow(`@import "[path-to-file]/sprites-${name}";`));
            });
            sassStream.end();
        });

        log(colors.red('See https://github.com/spothero/ace/wiki/Sprites for more details.'));
    });

    return stream;
};

gulp.task('generateSprites', generateSpritesTask);

module.exports = generateSpritesTask;
