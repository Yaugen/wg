/*global define */

define([
    'app',
    'underscore',
    'marionette',
    'collections/Items',
    'models/Item',
    'views/SelectedItems',
    'views/ItemContainer',
    'views/Filters'
], function (app, _, Marionette, ItemsCollection, ItemModel, SelectedItems, ItemContainer, FiltersView) {
    'use strict';

    return Marionette.ItemView.extend({
        className: 'dialog-wrap',
        template: 'selectedItemsDialog',
        ui: {
            filters: '.filters-wrap',
            itemContainer: '.item-container-wrap',
            selectedItems: '.selected-items-wrap',
            buttonCancel: '.btn-cancel',
            buttonConfirm: '.btn-confirm'
        },
        events: {
            'click @ui.buttonConfirm': 'onButtonConfirmClick',
            'click @ui.buttonCancel': 'onButtonCancelClick'
        },
        renderStep: 15,
        lastIndex: 0,

        initialize: function(options) {
            _.bindAll(this, 'onScrolledToEnd', 'onFilterChanged', 'onButtonConfirmClick', 'onButtonCancelClick');
            this.selectedCollection = options.selectedCollection;
            this.collection = new ItemsCollection().addManyItems();
            this.syncCollections();
            this.itemContainerCollection = new ItemsCollection();
            this.adjustItemContainerCollection();

            this.listenTo(this.selectedCollection, 'remove', this.onItemRemoved);
            this.listenTo(this.collection, 'change:selected', this.onSelectedChanged);
            this.listenTo(this.collection, 'reset', this.onCollectionReset);
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
            this.ui.filters.html(filtersView.render().el);

            this.listenTo(itemContainerView, 'scrolledToEnd', this.onScrolledToEnd);
            this.listenTo(filtersView, 'filterChanged', this.onFilterChanged);
            // itemContainerView.on('scrolledToEnd', this.onScrolledToEnd);
         //    filtersView.on('filterChanged', this.onFilterChanged);
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
        onFilterChanged: function(filter) {
            this.currentFilter = filter.filterFunction;
            this.lastIndex = 0;
            this.itemContainerCollection.reset();
            this.adjustItemContainerCollection();
        },
        onCollectionReset: function() {
            this.itemContainerCollection.trigger('reset');
            this.selectedCollection.trigger('reset');
        },
        onButtonCancelClick: function() {
            this.triggerResultDialog({result: 'cancel'});
        },
        onButtonConfirmClick: function() {
            this.triggerResultDialog({result: 'confirm', collection: this.selectedCollection});
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
            var filteredModels = this.currentFilter ? this.collection.useFilter(this.currentFilter) : this.collection.models,
                models = filteredModels.slice(this.lastIndex, this.lastIndex + this.renderStep);

            this.itemContainerCollection.add(models);
            this.lastIndex += this.renderStep;
        },
        triggerResultDialog: function(data) {
            app.vent.trigger('result:dialog', data);
        }
    });
});
