/*global define */

define([
    'underscore',
    'marionette',
], function (_, Marionette) {
    'use strict';

    return Marionette.ItemView.extend({
        template: 'item',
    });
});
