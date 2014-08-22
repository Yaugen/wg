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
        renderStep: 15,
        lastIndex: 0,

        initialize: function(options) {
        	_.bindAll(this, 'onScrolledToEnd');
            this.selectedCollection = options.selectedCollection;
            this.collection = new ItemsCollection().addManyItems();
            this.syncCollections();
            this.itemContainerCollection = new ItemsCollection();
            this.adjustItemContainerCollection();

            this.listenTo(this.selectedCollection, 'remove', this.onItemRemoved);
    		this.listenTo(this.collection, 'change:selected', this.onSelectedChanged);
        },
        onRender: function() {
            var selectedItemsView, itemContainerView, filtersView; 

            selectedItemsView = new SelectedItems({
            	collection: this.selectedCollection
            });

            itemContainerView = new ItemContainer({
            	collection: this.itemContainerCollection,
            	selectedCollection: this.selectedCollection
            });

            filtersView = new FiltersView();

        	this.ui.selectedItems.html(selectedItemsView.render().el);
        	this.ui.itemContainer.html(itemContainerView.render().el);
        	this.ui.filters.html(selectedItemsView.render().el);

        	itemContainerView.on('scrolledToEnd', this.onScrolledToEnd);
        },
        onDestroy: function() {
        	
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
    	onScrolledToEnd: function() {
    		this.adjustItemContainerCollection();
    	},
        syncCollections: function() {
        	var that = this;
        	this.selectedCollection.each(function(e) {
        		var item = that.collection.get(e.get('item'));
        		if(item) {
        			item.set('selected', true);
        		}
        	})
        },
        adjustItemContainerCollection: function() {
        	var models = this.collection.models.slice(this.lastIndex, this.lastIndex + this.renderStep);
        	this.itemContainerCollection.add(models);
        	this.lastIndex += this.renderStep;
        }
    });
});
