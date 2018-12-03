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
const src = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}`;

gulp.task('watch', ['lintJS'], watchTask({
    sass: [
        `${src}/${global.SETTINGS_CONFIG.src.sass.path}/**/*.scss`,
        ...sassPatterns
    ],
    js: [
        `${src}/${global.SETTINGS_CONFIG.src.js.path}/**/*.{js,jsx}`,
        ...jsPatterns
    ]
}));
