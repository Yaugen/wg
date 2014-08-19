$.widget('task.selectItemsDialog', $.ui.dialog, {
	
	$itemContainer: null,
	$filter: null,
	$search: null,
	$selectedItems: null,

	filters: [{
		predicate: function(i, e) {
			return true;
		},
		label: 'No filter',
		value: 'noFilter'
	}, {
		predicate: function(i, e) {
			return e > 10;
		},
		label: "Greater than 10",
		value: 'gt10'
	}],

	options: {
		items: []
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
		this.$itemContainer.itemContainer();
		this.$filter.filterItems({filters: this.filters});
		this.$search.searchItems();
	},

	attachHandlers: function() {
		this.$search.on('search', function(e, data) {
			console.log('search', data);
		});
		this.$filter.on('filterSelected', function (e, data) {
			console.log('filter', data)
		})
	},

	prepareItems: function() {
		this.options.items.map(function(i, e, array) {
			return e;
		})
	}
})