// browserSync
module.exports = {
    options: {
        notify: false,
        background: true
    },
    livereload: {
        options: {
            files: [
                "<%= pkg.source %>/{,*/}*.html",
                ".tmp/styles/{,*/}*.css",
                "<%= pkg.source %>/images/{,*/}*",
                ".tmp/scripts/{,*/}*.js"
            ],
            port: "<%= pkg.port %>",
            server: {
                baseDir: [
                    ".tmp",
                    "<%= pkg.source %>"
                ],
                routes: {
                    "/bower_components": "./bower_components"
                }
            }
        }
    },
    test: {
        options: {
            port: "<%= pkg.testPort %>",
            open: false,
            logLevel: "silent",
            host: "localhost",
            server: {
                baseDir: [
                    ".tmp",
                    "./test",
                    "<%= pkg.source %>"
                ],
                routes: {
                    "/bower_components": "./bower_components"
                }
            }
        }
    },
    dist: {
        options: {
            background: false,
            server: "<%= config.dist %>"
        }
    }
};
