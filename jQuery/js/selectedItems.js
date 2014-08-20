$.widget('task.selectedItems', {

	$selectedItemsList: null,

	options: {
		selectedItems: []
	},

	_init: function() {
		this.$selectedItemsList = $('.selected-items', this.element);
		this.attachHandlers();
	},
	_create: function() {
		var items = this.options.selectedItems.map(function(e, i) {
			return {item: e, selected: true};
		});
		tmpl = nunjucks.render('selectedItemsTemplate.html', {
			items: items,
			showClose: true
		});
		this.element.html(tmpl);
	},
	attachHandlers: function() {
		this.$selectedItemsList.on('click', '.js-delete-item', $.proxy(this.onItemRemoved, this));
	},
	getItems: function() {
		return this.options.selectedItems;
	},
	addItem: function(item) {
		var itemTmpl = nunjucks.render('itemTemplate.html', {
			showClose: true,
			item: {
				item: item, 
				selected: true
			}
		});
		this.$selectedItemsList.append(itemTmpl);
		this.options.selectedItems.push(item);
	},
	removeItem: function(item) {
		var itemIndex = this.options.selectedItems.indexOf(item),
			$itemWrap = this.$selectedItemsList.find('.item-wrap[data-item="' + item + '"]');

		if(itemIndex >= 0) {
			$itemWrap.remove();
			this.options.selectedItems.slice(itemIndex, 1);
		}
	},
	onItemRemoved: function(e) {
		var item = $(e.target).parents('.item-wrap').data('item');
		this.removeItem(item);
		this.element.trigger('itemRemoved', item);
	}
});