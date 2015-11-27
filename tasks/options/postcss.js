//desc
module.exports = {
    options: {
        map: true,
        processors: [
            // Add vendor prefixed styles
            require('autoprefixer-core')({
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            })
        ]
    },
    dist: {
        files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
        }]
    }
};
