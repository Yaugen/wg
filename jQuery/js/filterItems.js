$.widget('task.filterItems', {
    $select: null,

    options: {
        filters: []
    },

    _init: function() {
        this.$select = $('#item-filter', this.element);

        this.$select.on('change', $.proxy(this.onSelectionChange, this));
    },

    _create: function() {
        var tmpl = nunjucks.render('filterItemsTemplate.html', {filters: this.options.filters});
        this.element.html(tmpl);
    },

    onSelectionChange: function() {
        var selectedValue = this.$select.find(':selected').val(),
            selectedFilter = _.find(this.options.filters, function(e, i) {
                return e.value === selectedValue;
            });

        this.element.trigger('filterSelected', {selectedFilter: selectedFilter});
    }
})