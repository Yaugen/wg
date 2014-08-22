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

    	renderStep: 15,
    	renderLimit: 0,
    	currentIndex: 0,
    	
    	initialize: function() {
    		this.renderLimit = this.renderStep;
    		_.bindAll(this, 'onScroll');
    	},
    	attachHtml: function(collectionView, childView, index){
    		if(this.renderLimit <= this.currentIndex) {
    			return;
    		}
			if (collectionView.isBuffering) {
				// buffering happens on reset events and initial renders
				// in order to reduce the number of inserts into the
				// document, which are expensive.
				collectionView.elBuffer.appendChild(childView.el);
				this.currentIndex++;
			}
			else {
				// If we've already rendered the main collection, just
				// append the new children directly into the element.
				collectionView.$el.append(childView.el);
			}
		},
    	// Called after all children have been appended into the elBuffer
		appendHtml: function(collectionView, buffer) {
			console.log(buffer);
			collectionView.$el.append(buffer);
		},
		onRender: function() {
			this.$el.on('scroll', this.onScroll);
		},
		onDestroy: function() {
			this.$el.off('scroll', this.onScroll);
		},
    	onScroll: function(e) {
    		if(this.$el.scrollTop() + this.$el.innerHeight() >= e.target.scrollHeight) {
    			this.renderLimit += this.renderStep;
    			this.currentIndex = 0;
	            this.render();
	        }
    	}
    });
});
