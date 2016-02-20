module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};
