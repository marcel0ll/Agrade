// Generates a custom Modernizr build that includes only the tests you
// reference in your app
module.exports = {
    dist: {
        devFile: "bower_components/modernizr/modernizr.js",
        outputFile: "<%= pkg.dist %>/scripts/vendor/modernizr.js",
        files: {
            src: [
                "<%= pkg.dist %>/scripts/{,*/}*.js",
                "<%= pkg.dist %>/styles/{,*/}*.css",
                "!<%= pkg.dist %>/scripts/vendor/*"
            ]
        },
        uglify: true
    }
};
