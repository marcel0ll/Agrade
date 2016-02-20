// Compiles Sass to CSS and generates necessary files if requested
module.exports = {
    options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: [ "." ]
    },
    dev: {
        files: [
            {
                expand: true,
                cwd: "<%= pkg.source %>",
                src: [ "{app,components}/**/*.{scss,sass}" ],
                dest: "<%= pkg.development %>",
                ext: ".css"
            },
            {
                expand: true,
                cwd: "<%= pkg.development %>/<%= pkg.dependenciesFolder %>",
                src: [ "*.{scss,sass}" ],
                dest: "<%= pkg.development %>/<%= pkg.dependenciesFolder %>",
                ext: ".css"
            }
        ]
    }
};
