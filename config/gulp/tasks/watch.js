const {
    parallel,
    series,
    task,
    watch,
} = require('gulp');
const includes = require('lodash/includes');
const projectPath = require('../lib/project-path');
const lintJS = require('./lint-js');
const lintSass = require('./lint-sass');
const sass = require('./sass');

const src = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${global.SETTINGS_CONFIG.src.path}`;
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
const watchTask = () => {
    watch([
        `${src}/${global.SETTINGS_CONFIG.src.sass.path}/**/*.scss`,
        ...sassPatterns
    ], parallel(sass, lintSass));
    watch([
        `${src}/${global.SETTINGS_CONFIG.src.js.path}/**/*.{js,jsx}`,
        ...jsPatterns
    ], {ignoreInitial: false}, lintJS);
};

task('watch', watchTask);

// const watchTask = () => {
//     watch([
//         `${src}/${global.SETTINGS_CONFIG.src.sass.path}/**/*.scss`,
//         ...sassPatterns
//     ], parallel(sass, lintSass));
//     watch([
//         `${src}/${global.SETTINGS_CONFIG.src.js.path}/**/*.{js,jsx}`,
//         ...jsPatterns
//     ], {ignoreInitial: false}, lintJS);

//     // cb();
// };

// task('watch', watchTask);

// const watchTask = ({sassSources, jsSources}) => {
//     return () => {
//         watch(sassSources, parallel(sass, lintSass));
//         watch(jsSources, parallel(lintJS));

//         cb();
//     };
// };

// task('watch', watchTask({
//     sassSources: [
//         `${src}/${global.SETTINGS_CONFIG.src.sass.path}/**/*.scss`,
//         ...sassPatterns
//     ],
//     jsSources: [
//         `${src}/${global.SETTINGS_CONFIG.src.js.path}/**/*.{js,jsx}`,
//         ...jsPatterns
//     ]
// }));
