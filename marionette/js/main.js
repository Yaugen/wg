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
        tpl: 'lib/tpl'
	},

	shim: {
		underscore: {
			//deps: ['requirejs'],
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
        }

	},
    waitSeconds: 60
});

require([
	'app',
    'modules/Pages',
    'jquery',
	'bootstrap'

], function (app, PagesModule) {
	'use strict';

    app.addInitializer(function() {
        PagesModule.start();
    });

	app.start();
});
