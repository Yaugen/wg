$.widget('task.searchItems', {

	$search: null,

	options: {
		debounceTimeout: 500
	},

	_init: function() {
		this.$search = $('#item-search', this.element);

		this.debouncedKeyup = $.debounce(
			this.options.debounceTimeout, 
			$.proxy(this.triggerSearchEvent, this)
		);
		this.$search.on('keyup', this.debouncedKeyup);
	},
	_create: function() {
		var tmpl = nunjucks.render('searchItemsTemplate.html');
		this.element.html(tmpl);
	},
	triggerSearchEvent: function() {
		this.element.trigger('search', {searchStr: this.$search.val()});
	}
})