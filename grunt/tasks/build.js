module.exports = function( grunt ) {
    grunt.registerTask("build", "Builds project", function( target ) {

        grunt.task.run([
            "jscs",
            "clean:dev",
            "jade:dev",
            "copy:dev",
            "injector:scss",
            "sass:dev",
            "babel:dev",
            "injector:dependencies",
            "injector:dev",
            "replace:dev"
        ]);
    });

};
