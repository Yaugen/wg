/*global define */

define([
    'underscore',
    'marionette',
    'views/SelectItems'
], function (_, Marionette, SelectItems) {
    'use strict';

    return Marionette.LayoutView.extend({
        className: 'main-wrap',
        template: 'main',
        regions: {
        	selectItems: 'div.select-items'
        },
        onRender: function() {
        	this.selectItems.show(new SelectItems());
        }
    });
});
