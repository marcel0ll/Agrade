"use strict";

module.exports = function( grunt ) {
    var path = require("path");

    // Time how long tasks take. Can help when optimizing build times
    require("time-grunt")( grunt );

    // Automatically load required grunt tasks
    // load all grunt tasks matching the ["grunt-*", "@*/grunt-*"] patterns
    require("load-grunt-tasks")( grunt );
    grunt.loadTasks("./grunt/tasks/");

    // Inits configuration
    require("load-grunt-config")( grunt, {
        configPath: path.join( process.cwd(), "grunt/options/"),
        data: {
            pkg: grunt.file.readJSON("package.json")
        }
    });
};
