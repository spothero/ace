const fs = require('fs');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const includes = require('lodash/includes');
const friendlyFormatter = require('eslint-friendly-formatter');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');

const lintJSTask = src => {
    const eslintStream = (process.env.ACE_NPM_EVENT !== 'build')
        ? eslint.format(friendlyFormatter)
        : eslint.format('checkstyle', fs.createWriteStream(`${projectPath(global.SETTINGS_CONFIG.root.path)}/checkstyle-eslint.xml`));

    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslintStream)
        .pipe(eslint.failAfterError())
        .on('error', handleErrors);
};

gulp.task('lintJS', () => {
    const patterns = (global.TASK_CONFIG.lintJS.patterns.length)
        ? global.TASK_CONFIG.lintJS.patterns.map(pattern => {
            let newPattern = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${pattern}`;

            if (includes(pattern, '!')) {
                newPattern = `!${newPattern.replace('!', '')}`;
            }

            return newPattern;
        })
        : [];

    return lintJSTask([
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}/${global.SETTINGS_CONFIG.src.js.path}/**/*.{js,jsx}`,
        ...patterns
    ]);
});
