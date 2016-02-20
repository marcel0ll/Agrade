// jscs
module.exports = {
	idiomatic: {
	    src: "<%= pkg.source %>" + "/{app,components}/**/*.js",
	    options: {
	        config: ".jscsrc",
	        reporter: "inline.js",
	        verbose: false,
	        fix: true,
	        reporterOutput: "jscs.log"
	    }
	}
};
