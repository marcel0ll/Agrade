module.exports = function (grunt) {
    grunt.registerTask('default', [
        'newer:eslint',
        'test',
        'build'
    ]);
};
