// Renames files for browser caching purposes
module.exports = {
    dist: {
        src: [
            '<%= pkg.dist %>/scripts/{,*/}*.js',
            '<%= pkg.dist %>/styles/{,*/}*.css',
            '<%= pkg.dist %>/images/{,*/}*.*',
            '<%= pkg.dist %>/styles/fonts/{,*/}*.*',
            '<%= pkg.dist %>/*.{ico,png}'
        ]
    }
};
