const notify = require('gulp-notify');

const handleErrors = function handleErrors(...args) {
    const items = Array.prototype.slice.call(args);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, items);

    this.emit('end');
};

module.exports = handleErrors;
