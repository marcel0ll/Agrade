// Replaces text
module.exports = {
    dev: {
        src: [ "<%= pkg.development %>/app/screen_home/home.html" ],
        overwrite: true,
        replacements: [
            {
                from: "{{version}}",
                to: "<%= pkg.version %>"
            }
        ]
    }
};
