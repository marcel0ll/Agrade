// connect
module.exports = {
    dev: {
        options: {
            base: "<%= pkg.development %>",
            // middlewares: function( connect, options ) {
            //     var modRewrite = require("connect-modrewrite");
            //     // Matches everything that does not contain a "." (period)
            //     middlewares.push( modRewrite([ "^[^\\.]*$ /index.html [L]" ]) );
            //     options.base.forEach(function( base ) {
            //         middlewares.push( connect.static( base ) );
            //     });
            //     return middlewares;
            // },
            livereload: true,
            port: "<%= pkg.port %>"
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
