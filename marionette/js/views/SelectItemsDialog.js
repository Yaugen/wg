/*global define */

define([
    'app',
    'underscore',
    'marionette',
    'collections/Items',
    'models/Item',
    'views/SelectedItems',
    'views/ItemContainer'
], function (app, _, Marionette, ItemsCollection, ItemModel, SelectedItems, ItemContainer) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'selectedItemsDialog',
        ui: {
            filters: '.filters',
            itemContainer: '.item-container-wrap',
            selectedItems: '.selected-items'
        },
        initialize: function(options) {
            this.selectedCollection = options.selectedCollection;
            this.collection = new ItemsCollection().addManyItems();
            this.syncCollections();
            this.listenTo(this.selectedCollection, 'remove', this.onItemRemoved);
    		this.listenTo(this.collection, 'change:selected', this.onSelectedChanged);
        },
        onRender: function() {
            var selectedItemsView, itemContainerView, filtersView; 

            selectedItemsView = new SelectedItems({
            	collection: this.selectedCollection
            });

            itemContainerView = new ItemContainer({
            	collection: this.collection,
            	selectedCollection: this.selectedCollection
            })

        	this.ui.selectedItems.html(selectedItemsView.render().el);
        	this.ui.itemContainer.html(itemContainerView.render().el);
        },
        onSelectedChanged: function(model, value) {
        	var item = model.get('item'),
        		removeModel;
    		if(value) {
	    		this.selectedCollection.add(new ItemModel({item: item}));
    		} else {
    			removeModel = this.selectedCollection.get(item)
	    		this.selectedCollection.remove(removeModel);
    		}
    	},
    	onItemRemoved: function(model, collection, operation) {
    		var item = model.get('item');
    		this.collection.get(item).set('selected', false);
    	},
        syncCollections: function() {
        	var that = this;
        	this.selectedCollection.each(function(e) {
        		var item = that.collection.get(e.get('item'));
        		if(item) {
        			item.set('selected', true);
        		}
        	})
        }
    });
});
