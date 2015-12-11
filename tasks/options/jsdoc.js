module.exports({
    jsdoc : {
        docs : {
            src: [
                src_path+'/**/*.js',

                'README.md'
            ],
            options: {
                destination: documentation_path,
                template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                configure : "jsdoc.conf.json"
            }
        },
        dist : {
            src: ['!src/**/*.js', 'README.md'],
            options: {
                destination: 'doc',
                template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
            }
        }
    }
});
