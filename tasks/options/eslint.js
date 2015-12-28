// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
    target: [
        'Gruntfile.js',
        '<%= pkg.app %>/scripts/{,*/}*.js',
        '!<%= pkg.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
    ]
};
