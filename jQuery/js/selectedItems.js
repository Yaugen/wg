$.widget('task.selectedItems', {

	$selectedItemsList: null,

	options: {
		selectedItems: []
	},

	_init: function() {
		this.$selectedItemsList = $('.selected-items', this.element);
	},
	_create: function() {
		var tmpl = nunjucks.render('templates/selectedItemsTemplate.html', {items: this.options.selectedItems});
		this.element.html(tmpl);
	},
	getItems: function() {
		return this.options.selectedItems;
	},
	addItem: function(item) {
		var itemTmpl = nunjucks.render('templates/itemTemplate.html', item);
		console.log(itemTmpl);
	}
});