$.widget('task.selectItemsDialog', $.ui.dialog, {
	
	$itemContainer: null,
	$filter: null,
	$search: null,
	$selectedItems: null,

	filters: [{
		predicate: function(e, i) {
			return true;
		},
		label: 'No filter',
		value: 'noFilter'
	}, {
		predicate: function(e, i) {
			return i > 10;
		},
		label: "Greater than 10",
		value: 'gt10'
	}],

	options: {
		items: [],
		selectedItems: []
	},

	open: function() {
		var tmpl = nunjucks.render('templates/selectItemsDialogTemplate.html', {
			items: this.options.items
		});
		this.element.html(tmpl)

		this.$itemContainer = $('.js-items-container', this.element);
		this.$filter = $('.js-filter', this.element);
		this.$search = $('.js-search', this.element);
		this.$selectedItems = $('.js-selected-items', this.element);

		this.prepareItems();
		this.attachHandlers();
		this.initWidgets();

		return this._super();
	},

	initWidgets: function() {
		this.$itemContainer.itemContainer({items: this.options.items });
		this.$filter.filterItems({filters: this.filters});
		this.$search.searchItems();
		this.$selectedItems.selectedItems({selectedItems: this.options.selectedItems})
	},

	attachHandlers: function() {
		this.$search.on('search', $.proxy(function(e, data) {
			console.log('search', data);
			this.currentSearchString = data.searchStr.toLowerCase();
			this.filterItems();
		},this));
		this.$filter.on('filterSelected', $.proxy(function (e, data) {
			console.log('filter', data)
			this.currentFilter = data.selectedFilter;
			this.filterItems();
		}, this));
	},

	prepareItems: function() {
		this.options.items.map(function(i, e, array) {
			return e;
		})
	},

	filterItems: function() {
		var filtered = [],
			that = this;
		if(this.currentFilter) {
			filtered = this.options.items.filter(this.currentFilter.predicate);
		} else {
			filtered = this.options.items;
		}
		if(this.currentSearchString) {
			filtered = filtered.filter(function(e, i) {
				return e.toLowerCase().indexOf(that.currentSearchString) >= 0;
			})
		}

		this.$itemContainer.itemContainer('replaceItems', filtered);
	}
})