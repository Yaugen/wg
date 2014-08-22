/*global define */

define([
    'underscore',
    'marionette',
], function (_, Marionette) {
    'use strict';

    return Marionette.ItemView.extend({
        className: 'item-wrap',
        template: 'selectedItem',
        events: {
            'click .remove-item': 'removeItem'
        },
        removeItem: function() {
            this.model.collection.remove(this.model);
            this.remove();
        }
    });
});
