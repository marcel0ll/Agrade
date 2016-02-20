// Minifies image files
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: "<%= pkg.source %>/images",
                src: "{,*/}*.{gif,jpeg,jpg,png}",
                dest: "<%= pkg.dist %>/images"
            }
        ]
    }
};
