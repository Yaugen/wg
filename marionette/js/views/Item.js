/*global define */

define([
    'underscore',
    'marionette',
], function (_, Marionette) {
    'use strict';

    return Marionette.ItemView.extend({
        className: 'item-wrap',
        template: 'item',
        events: {
            'click .item': 'onClick'
        },
        initialize: function() {
            this.listenTo(this.model, 'change:selected', this.rerender);
        },
        rerender: function() {
            if(!this.isDestroyed) {
                this.render();
            }
        },
        onClick: function(e) {
            if(this.model.get('disabled')) {
                e.stopPropagation();
                return;
            }
            if(this.model.get('selected')) {
                this.model.set('selected', false);
            } else {
                this.model.set('selected', true);
            }
            this.rerender();
        }
    });
});
