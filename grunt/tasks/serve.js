module.exports = function( grunt ) {
    grunt.registerTask("serve", "Serves static website", function( target ) {

        if ( target === "dist" ) {
            return grunt.task.run([
                'connect:prod'
            ]);
        }

        // target === "dev" || !target
        grunt.task.run([
           "connect:dev",
           "watch"
        ]);
    });
};
