/*global define */

define([
    'underscore',
    'marionette',
], function (_, Marionette) {
    'use strict';

    return Marionette.ItemView.extend({
        className: 'filters',
        template: 'filters',
        ui: {
            search: '#search',
            filter: '#filter'
        },
        events: {
            'keyup @ui.search': 'search',
            'change @ui.filter': 'filter'
        },
        filters: {
            noFilter: function(e, i) {
                return true;
            },
            gt50: function(e, i) {
                return i > 50;
            },
            gt75: function(e, i) {
                return i > 75;
            },
        },

        initialize: function() {
            this.currentFilter = this.filters.noFilter;
            this.currentSearch = '';
        },

        filter: function() {
            var value = this.ui.filter.val();
            if(this.filters[value]) {
                this.currentFilter = this.filters[value];
                this.triggerFilterChange();
            }
        },

        search: _.debounce(function() {
            var value = this.ui.search.val();

            this.currentSearch = value;
            this.triggerFilterChange();
        }, 300),

        triggerFilterChange: function() {
            this.trigger('filterChanged', {filterFunction: this.createFilterFunction()})
        },

        createFilterFunction: function() {
            var filter = this.currentFilter,
                search = this.currentSearch,
                searchFilter = function(e, i){
                    return search.length ? e.get('item').indexOf(search) >= 0 : true;
                };

            return function(e, i) {
                return filter(e, i) && searchFilter(e, i);
            }
        }
    });
});
