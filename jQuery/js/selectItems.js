$.widget('task.selectItems', {

	$selectedItems: null,
	$selectBtn: null,

	options: {
		maxSelectedItems: 3,
		selectedItems: []
	},

	_init: function() {
		this.$selectedItems = $(".js-selected-items", this.element);
		this.$selectBtn = $(".js-edit-selection", this.element);

		this.$selectedItems.selectedItems({selectedItems: this.options.selectedItems});
		this.attachHandlers();
	},

	_create: function() {
		var tmpl = nunjucks.render('selectItemsTemplate.html');
		this.element.html(tmpl);
	},

	attachHandlers: function() {
		this.$selectBtn.on('click', $.proxy(this.openEditDialog, this));
	},

	openEditDialog: function() {
		var items = [];
		for(var i=0; i<300;i++) {
			items.push('item ' + i);
		}
		$('<div/>').selectItemsDialog({ 
			items: items, 
			selectedItems: this.options.selectedItems,
			maxSelectedItems: this.options.maxSelectedItems,
			width: '500px',
			modal: true
		});
	}
})