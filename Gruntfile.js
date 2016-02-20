"use strict";

module.exports = function( grunt ) {

    // Time how long tasks take. Can help when optimizing build times
    require("time-grunt")( grunt );

    var config = {
        pkg: grunt.file.readJSON("package.json"),
        env: process.env
    };

    // Automatically load required grunt tasks
    // load all grunt tasks matching the ["grunt-*", "@*/grunt-*"] patterns
    require("load-grunt-tasks")( grunt );
    grunt.loadTasks("./grunt/tasks/");

    // Function to load config separately
    function loadConfig( path ) {
        var glob = require("glob"),
            object = {},
            key;

        glob.sync("*", { cwd: path }).forEach(function( option ) {
            key = option.replace( /\.js$/, "" );
            object[ key ] = require( path + option );
        });

        return object;
    }

    // Magical line that actually load tasks configs from path below
    grunt.util._.extend( config, loadConfig("./grunt/options/") );

    // Inits configuration
    grunt.initConfig( config );
};
