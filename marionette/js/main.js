require.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		babysitter: '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		wreqr: '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
		localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        nunjucks: '../bower_components/nunjucks/browser/nunjucks',
        text: '../bower_components/requirejs-text/text'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		babysitter: {
			exports: 'Backbone.babysitter',
			deps: ['backbone']
		},

		wreqr: {
			exports: 'Backbone.Wreqr',
			deps: ['backbone']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone', 'wreqr', 'babysitter']
		},

        bootstrap: {
            deps: ['jquery']
        },



	},
    waitSeconds: 60
});

require([
	'app',
    'jquery',
	'bootstrap'
], function (app) {
	'use strict';

	app.start();
});
