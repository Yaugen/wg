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
            _.bindAll(this, 'editSelection', 'onDialogResult');
            this.listenTo(this.selectedCollection, 'remove', function() {
                console.log('on removed')
            });
        },
        ui: {
            selectedItems: 'div.selected-items',
            editButton: '.edit-selection'
        },
        events: {
            'click @ui.editButton': 'editSelection'
        },
        onRender: function() {
            this.renderSelectedCollection();
        },
        renderSelectedCollection: function() {
            this.selectedItemsView = new SelectedItems({collection: this.selectedCollection});
            this.ui.selectedItems.html(this.selectedItemsView.render().el);
        },
        editSelection: function() {
            this.previousCollection = new ItemsCollection(this.selectedCollection.models);
            app.vent.trigger('open:dialog', {
                viewConstructor: SelectItemsDialog, 
                viewOptions: {
                    selectedCollection: this.selectedCollection
                }
            });
            app.vent.on('result:dialog', this.onDialogResult);

        },
        onDialogResult: function(data) {
            if(data.result == 'cancel') {
                this.selectedItemsView.destroy();
                this.selectedCollection.reset(this.previousCollection.models);
                this.renderSelectedCollection();
            }
        }
    });
});
