// Mocha testing framework configuration options
module.exports = {
    all: {
        options: {
            run: true,
            urls: ['http://<%= browserSync.test.options.host %>:<%= browserSync.test.options.port %>/index.html']
        }
    }
};
