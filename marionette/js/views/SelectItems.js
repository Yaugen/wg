/*global define */

define([
    'app',
    'marionette',
    'collections/Items',
    'views/SelectedItems',
    'views/SelectItemsDialog'
], function (app, Marionette, ItemsCollection, SelectedItems, SelectItemsDialog) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'selectItems',
        initialize: function() {
            this.selectedCollection = new ItemsCollection().addItem('item 1');
            _.bindAll(this, 'editSelection');
        },
        ui: {
            selectedItems: 'div.selected-items',
            editButton: '.edit-selection'
        },
        events: {
            'click @ui.editButton': 'editSelection'
        },
        onRender: function() {
            var selectedItemsView = new SelectedItems({collection: this.selectedCollection});
            this.ui.selectedItems.html(selectedItemsView.render().el);
        },
        editSelection: function() {
            app.vent.trigger('open:dialog', {
                viewConstructor: SelectItemsDialog, 
                viewOptions: {
                    selectedCollection: this.selectedCollection
                }
            });
        }
    });
});
