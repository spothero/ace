const gulp = require('gulp');
const watch = require('gulp-watch');
const includes = require('lodash/includes');
const projectPath = require('../lib/project-path');

const sassPatterns = global.TASK_CONFIG.watch.sassPatterns.length
    ? global.TASK_CONFIG.watch.sassPatterns.map(pattern => {
          let newPattern = `${projectPath(
              global.SETTINGS_CONFIG.root.path
          )}/${pattern}`;

          if (includes(pattern, '!')) {
              newPattern = `!${newPattern.replace('!', '')}`;
          }

          return newPattern;
      })
    : [];

const watchTask = ({sass}) => {
    return () => {
        watch(sass, () => gulp.start(['sass', 'lintSass']));
    };
};
const src = `${projectPath(global.SETTINGS_CONFIG.root.path)}/${
    global.SETTINGS_CONFIG.src.path
}`;

gulp.task(
    'watch',
    watchTask({
        sass: [
            `${src}/${global.SETTINGS_CONFIG.src.sass.path}/**/*.scss`,
            ...sassPatterns,
        ]
    })
);
