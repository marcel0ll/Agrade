// Make sure code styles are up to par and there are no obvious mistakes
module.exports = {
    target: [
        "Gruntfile.js",
        "<%= pkg.source %>/scripts/{,*/}*.js",
        "!<%= pkg.source %>/scripts/vendor/*",
        "test/spec/{,*/}*.js"
    ]
};
