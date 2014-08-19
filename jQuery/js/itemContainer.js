$.widget('task.itemContainer', {
	
	visibleItems: [],
	lastItemIndex: 0,

	options: {
		items: [],
		selectedItems: [],
		visibleItemStep: 15
	},

	_init: function() {


		this.attachHandlers()
	},

	_create: function() {
		var tmpl = nunjucks.render('templates/itemContainer.html');
		this.element.html(tmpl);
	},

	getNextItems: function() {
		
	},

	attachHandlers: function() {}

});