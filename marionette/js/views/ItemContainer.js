/*global define */

define([
    'underscore',
    'marionette',
    'models/Item',
    'views/Item'
], function (_, Marionette, ItemModel, Item) {
    'use strict';

    return Marionette.CollectionView.extend({
    	className: 'item-container',
    	childView: Item,

    	initialize: function() {
    		this.renderLimit = this.renderStep;
    		_.bindAll(this, 'onScroll');
    	},
		onRender: function() {
			this.$el.on('scroll', this.onScroll);
		},
		onDestroy: function() {
			this.$el.off('scroll', this.onScroll);
		},
    	onScroll: function(e) {
    		if(this.$el.scrollTop() + this.$el.innerHeight() >= e.target.scrollHeight) {
    			this.trigger('scrolledToEnd');
	        }
    	}
    });
});
