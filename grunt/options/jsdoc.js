// jsdocs
module.exports = {
    docs: {
        src: [
            "<%= pkg.src %>" + "/**/*.js",
            "README.md"
        ],
        options: {
            destination: "<%= pkg.docs %>",
            template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure: "jsdoc.conf.json"
        }
    }
};
