// jade
module.exports = {
    dev: {
        options: {
            pretty: true,
            data: {
                debug: false
            }
        },
        files: [
            {
                expand: true,
                cwd: "<%= pkg.source %>",
                src: [ "**/*.jade" ],
                dest: "<%= pkg.development %>",
                ext: ".html"
            }
        ]
    }
};
