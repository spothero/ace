const getRCValues = require('./gulp/lib/rc');

const defaults = getRCValues({
    browserslist: [
        '> 2%',
        'last 3 versions',
        'not ie < 11',
        'not blackberry > 0',
        'not UCAndroid > 0',
        'not Samsung > 0',
        'not baidu > 0',
        'not QQAndroid > 0',
        'not Opera > 0',
        'not OperaMini all',
        'not OperaMobile > 0',
        'not Android > 0'
    ]
});

module.exports = defaults.browserslist;
