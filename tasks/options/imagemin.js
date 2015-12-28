// The following *-min tasks produce minified files in the dist folder
module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: '<%= pkg.app %>/images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= pkg.dist %>/images'
        }]
    }
};
