/*global define */

define([
	'backbone',
	'models/Item'
], function (Backbone, Item) {
	'use strict';

	return Backbone.Collection.extend({
		model: Item,

		addManyItems: function() {
			for(var i = 0; i < 100; i++) {
				this.add(new Item({item: 'item ' + i}));
			}
			return this;
		},

		addItem: function(item) {
			this.add(new Item({item: item}));
			return this;
		}
	});
});
