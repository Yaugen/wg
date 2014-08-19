$.widget('task.itemContainer', {
	
	$itemList: null,
	$itemContainer: null,

	visibleItems: [],
	lastItemIndex: 0,

	options: {
		items: [],
		selectedItems: [],
		visibleItemStep: 15
	},

	_init: function() {
		this.$itemList = $('.item-list', this.element);
		this.$itemContainer = $('.item-container', this.element);

		this.renderItems();
		this.attachHandlers();
	},

	_create: function() {
		var tmpl = nunjucks.render('templates/itemContainer.html');
		this.element.html(tmpl);
	},

	renderItems: function(append) {
		var next = this.options.items.slice(this.lastItemIndex, this.lastItemIndex + this.options.visibleItemStep),
			tmpl = nunjucks.render('templates/itemListTemplate.html', {items: next});

		this.visibleItems.concat(next);
		if(append) {
			this.$itemList.append(tmpl);
		} else {
			this.$itemList.html(tmpl);
		}
		this.lastItemIndex += this.options.visibleItemStep;
	},

	attachHandlers: function() {
		this.$itemContainer.on('scroll', $.proxy(this.onContainerScroll, this));
	},

	replaceItems: function(items) {
		this.options.items = items;
		this.lastItemIndex = 0;
		this.renderItems();
	},

	onContainerScroll: function(e) {
		if(this.$itemContainer.scrollTop() + this.$itemContainer.innerHeight() >= e.target.scrollHeight) {
			console.log('End reached');
            this.renderItems(true);
        }
	}

});