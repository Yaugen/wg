/*global define */

define([
    'app',
    'underscore',
    'marionette',
    'collections/items',
    'views/SelectedItems',
], function (app, _, Marionette, ItemsCollection, SelectedItems) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'selectedItemsDialog',
        ui: {
            filters: '.filters',
            itemContainer: '.item-container',
            selectedItems: '.selected-items'
        },
        initialize: function(options) {
            this.selectedCollection = options.selectedCollection;
            this.collection = new ItemsCollection().addManyItems();
        },
        onRender: function() {
            var selectedItemsView = new SelectedItems({collection: this.selectedCollection});
        	this.ui.selectedItems.html(selectedItemsView.render().el);
        }
    });
});
