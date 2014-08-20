$.widget('task.selectItems', {

	$selectedItems: null,
	$selectBtn: null,
	$dialog: null,

	options: {
		maxSelectedItems: 3,
		selectedItems: []
	},

	_init: function() {
		this.$selectedItems = $(".js-selected-items", this.element);
		this.$selectBtn = $(".js-edit-selection", this.element);
		this.$dialog = $('.js-dialog', this.element);
		this.render();
		this.attachHandlers();
	},

	_create: function() {
		var tmpl = nunjucks.render('selectItemsTemplate.html');
		this.element.html(tmpl);
	},

	render: function() {
		this.$selectedItems.selectedItems({selectedItems: this.options.selectedItems});
	},

	attachHandlers: function() {
		this.$selectBtn.on('click', $.proxy(this.openEditDialog, this));
		this.$dialog.on('selectionConfirmed', $.proxy(this.selectionChanged, this));
		this.$selectedItems.on('itemRemoved', $.proxy(this.removeItem, this));
	},

	selectionChanged: function(e, data) {
		this.options.selectedItems = data.selectedItems;
		this.$selectedItems.selectedItems('destroy');
		this.render();
	},

	removeItem: function(e, item) {
		var itemIndex = this.options.selectedItems.indexOf(item);

		if(itemIndex >= 0) {
			this.options.selectedItems.splice(itemIndex, 1);
		}
	},

	openEditDialog: function() {
		
		this.$dialog.selectItemsDialog({ 
			items: this.options.items, 
			selectedItems: _.clone(this.options.selectedItems),
			maxSelectedItems: this.options.maxSelectedItems,
			width: '500px',
			modal: true,
			resizable: false
		});
	}
})