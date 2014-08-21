/*global define */

define([
    'backbone',
    'marionette',
    'nunjucks',
], 
function (Backbone, Marionette, nunjucks) {
    'use strict';

    var enviroment = new nunjucks.Environment(new nunjucks.WebLoader('js/templates')),
        templates = {
            main: 'main.html',
            selectItems: 'selectItems.html',
            selectedItemsDialog: 'selectedItemsDialog.html',
            item: 'item.html',
            selectedItem: 'selectedItem.html'
        };

    Backbone.Marionette.Renderer.render = function(template, data) {
        return enviroment.render(templates[template], data);
    }

    return templates;
});

