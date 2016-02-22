// injector
module.exports = {
    options: {},
    dependencies: {
        options: {
            relative: false,
            ignorePath: "<%= pkg.development %>/",
            sort: function( a, b ) {
                return a.length > b.length;
            },
            starttag: "<!-- injector:dep:{{ext}} -->"
        },
        files: {
            "<%= pkg.development %>/index.html": [ "<%= pkg.development %>/<%= pkg.dependenciesFolder %>/*.{js,css}" ]
        }
    },
    dev: {
        options: {
            relative: false,
            ignorePath: "<%= pkg.development %>/"
        },
        files: {
            "<%= pkg.development %>/index.html": [ "<%= pkg.development %>/{app,components}/**/*.js" ]
        }
    },
    scss: {
        options: {
            relative: false,
            ignorePath: "<%= pkg.source %>/",
            starttag: "/* injector:scss */",
            endtag: "/* injectorend */",
            transform: function( filepath, index, length ) {
                return "@import '.." + filepath + "';";
            }
        },
        files: {
            "<%= pkg.source %>/app/app.scss": [ "<%= pkg.source %>/{app,components}/**/!(app).scss" ]
        }
    }
};
