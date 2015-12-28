// Performs rewrites based on rev and the useminPrepare configuration
module.exports = {
    options: {
        assetsDirs: [
            '<%= pkg.dist %>',
            '<%= pkg.dist %>/images',
            '<%= pkg.dist %>/styles'
        ]
    },
    html: ['<%= pkg.dist %>/{,*/}*.html'],
    css: ['<%= pkg.dist %>/styles/{,*/}*.css']
};
