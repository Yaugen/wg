/*global define */

define([
    'underscore',
    'marionette',
], function (_, Marionette) {
    'use strict';

    return Marionette.ItemView.extend({
    	className: 'filters-wrap',
        template: 'filters',
    });
});
