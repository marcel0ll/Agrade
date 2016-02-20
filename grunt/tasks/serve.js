module.exports = function (grunt) {
    grunt.registerTask('serve', 'start the server and preview your app', function (target) {

        if (target === 'dist') {
            return grunt.task.run(['build', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'postcss',
            'browserSync:livereload',
            'watch'
        ]);
    });
};
