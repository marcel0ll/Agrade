// Empties folders to start fresh
module.exports = {
    dev: {
        src: [ "<%= pkg.development %>" ]
    },
    prod: {
        src: [ "<%= pkg.production %>" ]
    },
    docs: {
        src: [ "<%= pkg.docs %>" ]
    }
};
