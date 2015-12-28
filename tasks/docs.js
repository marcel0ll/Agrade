module.exports = function (grunt) {
    grunt.registerTask('docs',
        [
            'clean:docs',
            'jsdoc:docs'
        ]
    );
};
