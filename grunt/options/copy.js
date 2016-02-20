// Copies remaining files to places other tasks can use
module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= pkg.app %>',
            dest: '<%= pkg.dist %>',
            src: [
                '*.{ico,png,txt}',
                'images/{,*/}*.webp',
                '{,*/}*.html',
                'styles/fonts/{,*/}*.*'
            ]
        }, {
            expand: true,
            dot: true,
            cwd: '.',
            src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
            dest: '<%= pkg.dist %>'
        }]
    }
};
