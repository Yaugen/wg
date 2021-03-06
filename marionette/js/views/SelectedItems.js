/*global define */

define([
    'underscore',
    'marionette',
    'views/SelectedItem'
], function (_, Marionette, SelectedItem) {
    'use strict';

    return Marionette.CollectionView.extend({
        className: 'selected-items',
        childView: SelectedItem,
        
        removeItem: function(e) {
            var item = $(e.target).find('.item').data('item'),
                model = this.collection.get(item);

            this.collection.remove(model);
        },
    });
});
