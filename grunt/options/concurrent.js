// Run some tasks in parallel to speed up build process
module.exports = {
    server: [
        'babel:dist',
        'sass:server'
    ],
    test: [
        'babel'
    ],
    dist: [
        'babel',
        'sass',
        'imagemin',
        'svgmin'
    ]
};
