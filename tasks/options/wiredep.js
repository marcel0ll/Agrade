// Automatically inject Bower components into the HTML file
module.exports = {
    app: {
        src: ['<%= pkg.app %>/index.html'],
        exclude: ['bootstrap.js'],
        ignorePath: /^(\.\.\/)*\.\./
    },
    sass: {
        src: ['<%= pkg.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /^(\.\.\/)+/
    }
};
