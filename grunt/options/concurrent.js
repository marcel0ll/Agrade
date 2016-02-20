// Run some tasks in parallel to speed up build process
module.exports = {
    dist: [
        "babel",
        "sass",
        "imagemin",
        "svgmin"
    ]
};
