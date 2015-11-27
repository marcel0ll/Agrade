// Compiles ES6 with Babel
module.exports = {
    options: {
        sourceMap: true
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%= pkg.app %>/scripts',
            src: '{,*/}*.js',
            dest: '.tmp/scripts',
            ext: '.js'
        }]
    },
    test: {
        files: [{
            expand: true,
            cwd: 'test/spec',
            src: '{,*/}*.js',
            dest: '.tmp/spec',
            ext: '.js'
        }]
    }
};
