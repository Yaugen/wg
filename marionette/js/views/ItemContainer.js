/*global define */

define([
    'underscore',
    'marionette',
    'models/Item',
    'views/item'
], function (_, Marionette, ItemModel, Item) {
    'use strict';

    return Marionette.CollectionView.extend({
    	className: 'item-container',
    	childView: Item,
    });
});
