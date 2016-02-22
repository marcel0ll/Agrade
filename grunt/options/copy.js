// Copies remaining files to places other tasks can use
module.exports = {
    dev: {
        files: [
            {
                expand: true,
                cwd: "node_modules/",
                dest: "<%= pkg.development %>/<%= pkg.dependenciesFolder %>/",
                src: [
                    "angular-material/angular-material.scss",

                    "angular/angular.js",
                    "angular-animate/angular-animate.js",
                    "angular-aria/angular-aria.js",
                    "angular-messages/angular-messages.js",
                    "angular-ui-router/release/angular-ui-router.js",

                    "angular-material/angular-material.js",
                    "angular-material-icons/angular-material-icons.js",
                    "angular-material-icons/angular-material-icons.css"
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
