$.widget('task.selectedItems', {

	$selectedItems: null,
	$selectBtn: null,

	options: {},

	selectedItems: [],

	_init: function() {
		$selectedItems = $(".js-selected-items", this.element);
		$selectBtn = $(".js-edit-selection", this.element);

		this.attachHandlers();
	},

	_create: function() {
		var tmpl = nunjucks.render('templates/selectedItemsContainerTemplate.html');
		this.element.html(tmpl);
	},

	attachHandlers: function() {
		$selectBtn.on('click', this.openEditDialog);
	},

	openEditDialog: function() {
		$('<div/>').selectItemsDialog({ items: ['item 1', 'item 2', 'item 3', 'item 4',] });
	}
})