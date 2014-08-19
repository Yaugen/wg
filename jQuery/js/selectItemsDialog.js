$.widget('task.selectItemsDialog', $.ui.dialog, {
	
	templates: {},

	options: {
		items: []
	},

	open: function() {
		var tmpl = nunjucks.render('templates/selectItemsDialogTemplate.html', {
			items: this.options.items
		});
		this.element.html(tmpl)

		return this._super();
	}
})