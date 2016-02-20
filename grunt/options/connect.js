// connect
module.exports = {
    dev: {
        options: {
            livereload: true,
            port: "<%= pkg.port %>",
            base: "<%= pkg.development %>"
        }
    },

    prod: {
        options: {
            keepalive: true,
            port: "<%= pkg.port %>",
            base: "<%= pkg.production %>"
        }
    }
};
