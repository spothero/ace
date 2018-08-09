const getRCValues = require('./gulp/lib/rc');
const browserslist = require('./browserslist');

const defaults = getRCValues({
    babel: {
        presets: [
            ['env', {
                targets: {
                    browsers: browserslist,
                    node: 'current'
                },
                useBuiltIns: true
            }],
            'react',
            'stage-1'
        ],
        plugins: [
            'react-hot-loader/babel'
        ]
    }
});

module.exports = defaults.babel;
