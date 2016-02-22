// Watches files for changes and runs tasks based on the changed files
module.exports = {
    options: {
        livereload: false
    },
    jade: {
        files: [ "<%= pkg.source %>/**/*.jade" ],
        tasks: [
            "jade:dev",
            "injector:dependencies",
            "injector:dev"
        ]
    },
    assets: {
        files: [ "<%= pkg.source %>/assets/**/*" ],
        tasks: [ "copy:dev" ]
    },
    sass: {
        files: [ "<%= pkg.source %>/{app,components}/**/*.{scss,sass}" ],
        tasks: [ "sass:dev" ]
    },
    js: {
        files: [ "<%= pkg.source %>/{app,components}/**/!(*.spec).js" ],
        tasks: [
            "jscs",
            "babel:dev",
            "injector:dev"
        ]
    },

    livereload: {
        options: {
            livereload: true
        },
        files: [ "<%= pkg.development %>/**/*" ]
    }
};

