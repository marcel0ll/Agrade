// Watches files for changes and runs tasks based on the changed files
module.exports = {
    bower: {
        files: [ "bower.json" ],
        tasks: [ "wiredep" ]
    },
    babel: {
        files: [ "<%= pkg.source %>/scripts/{,*/}*.js" ],
        tasks: [ "babel:dist" ]
    },
    babelTest: {
        files: [ "test/spec/{,*/}*.js" ],
        tasks: [
            "babel:test",
            "test:watch"
        ]
    },
    gruntfile: {
        files: [ "Gruntfile.js" ]
    },
    sass: {
        files: [ "<%= pkg.source %>/styles/{,*/}*.{scss,sass}" ],
        tasks: [
            "sass:server",
            "postcss"
        ]
    },
    styles: {
        files: [ "<%= pkg.source %>/styles/{,*/}*.css" ],
        tasks: [
            "newer:copy:styles",
            "postcss"
        ]
    }
};
