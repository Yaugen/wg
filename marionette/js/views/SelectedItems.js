/*global define */

define([
    'underscore',
    'marionette',
    'views/item'
], function (_, Marionette, Item) {
    'use strict';

    return Marionette.CollectionView.extend({
    	childView: Item,
    	initialize: function() {
    		console.log('Selected view init')
    	},
    	onRender: function() {}
    });
});
