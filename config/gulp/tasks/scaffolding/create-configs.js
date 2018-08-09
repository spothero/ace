const gulp = require('gulp');
const prompt = require('gulp-prompt');
const log = require('fancy-log');
const colors = require('ansi-colors');
const projectPath = require('../../lib/project-path');

const scaffoldConfigsTask = () => {
    const projectConfigDir = (process.env.ACE_CONFIG_PATH)
        ? projectPath(process.env.ACE_CONFIG_PATH)
        : projectPath('config');

    return gulp.src([
        '../config/settings.js',
        '../config/tasks.js'
    ])
        .pipe(prompt.confirm({
            message: 'Scaffold ACE config files in /config directory? (you can do this later by calling `npm start -- scaffoldConfigs`)',
            default: true
        }))
        .pipe(gulp.dest(projectConfigDir))
        .on('end', () => {
            log(colors.yellow('Update `settings.js` for project settings and `tasks.js` for Gulp tasks.'));
        });
};

gulp.task('scaffoldConfigs', scaffoldConfigsTask);

module.exports = scaffoldConfigsTask;
