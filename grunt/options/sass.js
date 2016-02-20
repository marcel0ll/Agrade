// Compiles Sass to CSS and generates necessary files if requested
module.exports = {
    options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.']
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%= pkg.app %>/styles',
            src: ['*.{scss,sass}'],
            dest: '.tmp/styles',
            ext: '.css'
        }]
    },
    server: {
        files: [{
            expand: true,
            cwd: '<%= pkg.app %>/styles',
            src: ['*.{scss,sass}'],
            dest: '.tmp/styles',
            ext: '.css'
        }]
    }
};
