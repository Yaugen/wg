/*global define */

define([
	'backbone'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({
		idAttribute: 'item',
		defaults: {
            item: '',
            selected: false,
            disabled: false,
		},

	});
});

