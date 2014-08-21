/*global define */

define([
	'backbone',
	'models/Item'
], function (Backbone, Item) {
	'use strict';

	return Backbone.Collection.extend({
		model: Item,
		maxSelected: 3,
		currentlySelected: 0,
		disabled: false,
		initialize: function() {
			this.listenTo(this, 'change:selected', this.selectedChanged);
		},

		addManyItems: function() {
			for(var i = 0; i < 100; i++) {
				this.add(new Item({item: 'item ' + i}));
			}
			return this;
		},

		addItem: function(item) {
			this.add(new Item({item: item}));
			return this;
		},
		selectedChanged: function(model, value) {
			this.currentlySelected += value ? 1 : -1;
			if(this.currentlySelected >= this.maxSelected) {
				this.disabled = true;
				this.toggleElements();
			} else if(this.disabled){
				this.disabled = false;
				this.toggleElements();
			}
		},
		toggleElements: function(flag) {
			var that = this;
			this.each(function(e) {
				if(!e.get('selected')) {
					e.set('disabled', that.disabled);
				}
			})
			this.trigger('reset');
		},
	});
});
