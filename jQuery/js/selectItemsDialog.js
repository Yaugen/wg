$.widget('task.selectItemsDialog', $.ui.dialog, {
	
	$itemContainer: null,
	$filter: null,
	$search: null,
	$selectedItems: null,
	$confirmButton: null,
	$cancelButton: null,

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
		selectedItems: [],
		maxSelectedItems: 10
	},

	open: function() {
		var tmpl = nunjucks.render('selectItemsDialogTemplate.html', {
			items: this.options.items
		});
		this.element.html(tmpl)

		this.$itemContainer = $('.js-items-container', this.element);
		this.$filter = $('.js-filter', this.element);
		this.$search = $('.js-search', this.element);
		this.$selectedItems = $('.js-selected-items', this.element);
		this.$confirmButton = $('.js-confirm-button', this.element);
		this.$cancelButton = $('.js-cancel-button', this.element);

		this.prepareItems();
		this.attachHandlers();
		this.initWidgets();

		this.currentFilter = {
			predicate: function() {
				return true;
			}
		}

		return this._super();
	},

	initWidgets: function() {
		this.$itemContainer.itemContainer({
			items: this.options.items, 
			selectedItems: this.options.selectedItems,
			disabled: this.options.selectedItems.length == this.options.maxSelectedItems
		});
		this.$filter.filterItems({
			filters: this.filters
		});
		this.$search.searchItems();
		this.$selectedItems.selectedItems({
			selectedItems: this.options.selectedItems
		});
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

		this.$selectedItems.on('itemRemoved', $.proxy(this.itemRemoved, this));
		this.$itemContainer.on('itemSelected', $.proxy(this.itemSelected, this));
		this.$itemContainer.on('itemRemoved', $.proxy(this.itemRemoved, this));

		this.$confirmButton.on('click', $.proxy(this.confirmSelection, this));
		this.$cancelButton.on('click', this.close);
	},

	prepareItems: function() {
		this.options.items.map(function(i, e, array) {
			return e;
		})
	},

	filterItems: function() {
		var that = this,
			filtered = [];

		filtered = _(this.options.items)
		.filter(that.currentFilter.predicate)
		.filter(function(e, i) {
			if(!that.currentSearchString) {
				return true;
			} else {
				return e.toLowerCase().indexOf(that.currentSearchString) >= 0;
			}
		})

		this.$itemContainer.itemContainer('replaceItems', filtered);
	},

	itemSelected: function(e, item) {
		this.options.selectedItems.push(item);
		this.$selectedItems.selectedItems('addItem', item);
		this.checkSelectionCount();
	},

	itemRemoved: function(e, item) {
		var itemIndex = this.options.selectedItems.indexOf(item);

		this.checkSelectionCount();
		if(itemIndex >= 0) {
			this.$itemContainer.itemContainer('unselectItem', item);
			this.$selectedItems.selectedItems('removeItem', item);
			this.options.selectedItems.splice(itemIndex, 1);
		}
	},

	confirmSelection: function() {
		this.element.trigger('selectionConfirmed', {selectedItems: this.options.selectedItems});
		this.close();
	},

	checkSelectionCount: function() {
		if(this.options.selectedItems.length == this.options.maxSelectedItems) {
			this.$itemContainer.itemContainer('toggleDiableSelection');
		}
	}

})