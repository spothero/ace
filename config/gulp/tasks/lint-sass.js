const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const includes = require('lodash/includes');
const checkstyleFormatter = require('stylelint-checkstyle-formatter');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');

const lintSassTask = src => {
    const npmEvent = (process.env.npm_lifecycle_event)
        ? process.env.npm_lifecycle_event.split(':')[0]
        : 'start';
    const reporters = (npmEvent === 'start' || npmEvent === 'test' || npmEvent === 'cypress')
        ? [{formatter: 'string', console: true}]
        : [{formatter: checkstyleFormatter, save: 'checkstyle-stylelint.xml'}];

    return gulp.src(src)
        .pipe(stylelint({
            syntax: 'scss',
            reportOutputDir: projectPath(global.SETTINGS_CONFIG.root.path),
            reporters
        }))
        .on('error', handleErrors);
};

gulp.task('lintSass', () => {
    const patterns = (global.TASK_CONFIG.lintSass.patterns.length)
        ? global.TASK_CONFIG.lintSass.patterns.map(pattern => {
            let newPattern = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${pattern}`;

            if (includes(pattern, '!')) {
                newPattern = `!${newPattern.replace('!', '')}`;
            }

            return newPattern;
        })
        : [];

    return lintSassTask([
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.sass.path}/**/*.scss`,
        `!${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.sass.path}/utils/**/*.scss`,
        ...patterns
    ]);
});

module.exports = lintSassTask;
