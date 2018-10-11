var conf = require("./tools/build/config");
var args = require("./tools/build/args");

module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine", "karma-typescript"],

		files: [
			// polyfills
			"node_modules/core-js/client/shim.js",
			"node_modules/zone.js/dist/zone.js",
			"node_modules/zone.js/dist/long-stack-trace-zone.js",
			"node_modules/zone.js/dist/proxy.js",
			"node_modules/zone.js/dist/sync-test.js",
			"node_modules/zone.js/dist/jasmine-patch.js",
			"node_modules/zone.js/dist/async-test.js",
			"node_modules/zone.js/dist/fake-async-test.js",
			"node_modules/tslib/tslib.js",
			"node_modules/hls.js/dist/hls.js",

			// systemjs
			"node_modules/systemjs/dist/system.src.js",

			// phantomJS2 (and possibly others) might require it
			{ pattern: "node_modules/systemjs/dist/system-polyfills.js", included: false, watched: false, served: true },

			"node_modules/jquery/dist/jquery.min.js",
			"node_modules/jasmine-jquery/lib/jasmine-jquery.js",

			// skeleton vendors - DO NOT TOUCH UNLESS FROM SKELETON.
			{ pattern: "node_modules/lodash/**/*.js", included: false, watched: false },
			{ pattern: "node_modules/date-fns/**/*.js", included: false, watched: false },
			{ pattern: "node_modules/tslib/**/*.js", included: false, watched: false },
			{ pattern: "node_modules/hls.js/**/*.js", included: false, watched: false },
			{ pattern: "node_modules/rxjs/**/*.js", included: false, watched: false },
			{ pattern: "node_modules/rxjs/**/*.js.map", included: false, watched: false },
			{ pattern: "node_modules/@angular/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@angular/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/ionic-angular/umd/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/localforage/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@ngx-translate/**/*.js", included: false, watched: false, served: true },

			// obg
			{ pattern: "node_modules/@obg/*/dist/umd/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@obg/*/dist/umd/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/@obg/*/bundles/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@obg/*/bundles/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/@obg/diffusion-client/dist/diffusion-client.min.js", included: false, watched: false, served: true },

			// vendors - package vendors here...
			{ pattern: "node_modules/@ngrx/effects/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@ngrx/store/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@ngrx/core/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/ngx-translate/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/localforage/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/moment/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/lodash-decorators/**/*.js", included: false, watched: false, served: true },

			// source
			{ pattern: conf.src.ts, included: args.coverage, watched: true },
			{ pattern: conf.test.setup, included: false, watched: false },
			conf.src.html,
			"karma-test-shim.js"
		],

		exclude: [
			"node_modules/**/*_spec.js",
			"node_modules/**/*.spec.js",
		],

		preprocessors: {
			[conf.src.html]: ["ng-html2js"],
			[conf.test.setup]: ["karma-typescript"],
			[conf.src.ts]: ["karma-typescript"]
		},
		proxies: {
			// required for component assests fetched by Angular's compiler
			"/src/": "/base/src/"
		},
		ngHtml2JsPreprocessor: {
			angular: 2,
			cacheIdFromPath: function (filepath) {
				var tmpl = filepath.split("/");
				return tmpl[tmpl.length - 1];
			}
		},
		karmaTypescriptConfig: getTsConfig(),
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		browserNoActivityTimeout: 60000
	})
}

function getTsConfig() {
	const config = require("./tsconfig.json");
	config.compilerOptions.noEmitOnError = true;
	config.coverageOptions = config.coverageOptions || {};
	config.reports = config.reports || {};

	if (args.reporter.indexOf("teamcity") > -1) {
		config.reports.teamcity = "";
	}

	if (!args.coverage) {
		config.coverageOptions.instrumentation = false;
	} else {
		config.coverageOptions.exclude = /\.(d|spec|mock|model|module|const|config)\.ts|test|(config|model|const|module|index|public-api)\.ts/
	}

	return config;
}