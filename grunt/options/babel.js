// Compiles ES6 with Babel
module.exports = {
    options: {
        sourceMap: true
    },
    dev: {
        files: [
            {
                expand: true,
                cwd: "<%= pkg.source %>",
                src: [ "{app,components}/**/!(*.spec).js" ],
                dest: "<%= pkg.development %>"
            }
        ]
    }
};
