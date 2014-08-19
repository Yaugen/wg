$.widget('task.selectItems', {

	$selectedItems: null,
	$selectBtn: null,

	options: {
		maxSelectedItems: 3
	},

	selectedItems: [],

	_init: function() {
		$selectedItems = $(".js-selected-items", this.element);
		$selectBtn = $(".js-edit-selection", this.element);

		this.attachHandlers();
	},

	_create: function() {
		var tmpl = nunjucks.render('templates/selectItemsTemplate.html');
		this.element.html(tmpl);
	},

	attachHandlers: function() {
		$selectBtn.on('click', $.proxy(this.openEditDialog, this));
	},

	openEditDialog: function() {
		$('<div/>').selectItemsDialog({ 
			items: ['item 1', 'item 2', 'item 3', 'item 4',], 
			selectedItems: ['item 1'],
			maxSelectedItems: this.options.maxSelectedItems
		});
	}
})