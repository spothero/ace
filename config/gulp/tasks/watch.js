const gulp = require('gulp');
const includes = require('lodash/includes');
const projectPath = require('../lib/project-path');

const sassPatterns = (global.TASK_CONFIG.watch.sassPatterns.length)
    ? global.TASK_CONFIG.watch.sassPatterns.map(pattern => {
        let newPattern = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${pattern}`;

        if (includes(pattern, '!')) {
            newPattern = `!${newPattern.replace('!', '')}`;
        }

        return newPattern;
    })
    : [];
const jsPatterns = (global.TASK_CONFIG.watch.jsPatterns.length)
    ? global.TASK_CONFIG.watch.jsPatterns.map(pattern => {
        let newPattern = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${pattern}`;

        if (includes(pattern, '!')) {
            newPattern = `!${newPattern.replace('!', '')}`;
        }

        return newPattern;
    })
    : [];
const watchTask = ({sass, js}) => {
    return () => {
        gulp.watch(sass, ['sass', 'lintSass']);
        gulp.watch(js, ['lintJS']);
    };
};

gulp.task('watch', ['lintJS'], watchTask({
    sass: [
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.sass.path}/**/*.scss`,
        ...sassPatterns
    ],
    js: [
        `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.js.path}/**/*.{js,jsx}`,
        `!${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.js.path}/${global.SETTINGS_CONFIG.js.output}`,
        ...jsPatterns
    ]
}));

module.exports = watchTask;
