/*global define */

define([
	'backbone'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
            item: '',
		},

		initialize: function () {
			//this.set('content', _.result(templates.pages, this.get('name')));
		}
	});
});

