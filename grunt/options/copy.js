// Copies remaining files to places other tasks can use
module.exports = {
    dev: {
        files: [
            {
                expand: true,
                cwd: "node_modules/",
                dest: "<%= pkg.development %>/<%= pkg.dependenciesFolder %>/",
                src: [
                    "react/dist/react.js",
                    "react-dom/dist/react-dom.js"
                ],
                flatten: true
            },
            {
                expand: true,
                cwd: "<%= pkg.source %>/assets",
                src: "**",
                dest: "<%= pkg.development %>/assets"
            }
        ]
    }
};
