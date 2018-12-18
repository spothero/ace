const fs = require('fs');
const {
    src,
    task,
} = require('gulp');
const eslint = require('gulp-eslint');
const includes = require('lodash/includes');
const friendlyFormatter = require('eslint-friendly-formatter');
const handleErrors = require('../utils/handle-errors');
const projectPath = require('../lib/project-path');

const lintJS = () => {
    const eslintStream = (process.env.ACE_NPM_EVENT !== 'build')
        ? eslint.format(friendlyFormatter)
        : eslint.format('checkstyle', fs.createWriteStream(`${projectPath(global.SETTINGS_CONFIG.root.path)}/checkstyle-eslint.xml`));
    const patterns = (global.TASK_CONFIG.lintJS.patterns.length)
        ? global.TASK_CONFIG.lintJS.patterns.map(pattern => {
            let newPattern = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${pattern}`;

            if (includes(pattern, '!')) {
                newPattern = `!${newPattern.replace('!', '')}`;
            }

            return newPattern;
        })
        : [];

    return src([
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}/${global.SETTINGS_CONFIG.src.js.path}/**/*.{js,jsx}`,
        ...patterns
    ])
        .pipe(eslint())
        .pipe(eslintStream)
        .pipe(eslint.failAfterError())
        .on('error', handleErrors);
};

task('lintJS', lintJS);

module.exports = lintJS;
