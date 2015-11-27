// Empties folders to start fresh
module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                '<%= pkg.dist %>/*',
                '!<%= pkg.dist %>/.git*'
            ]
        }]
    },
    server: '.tmp'
};
