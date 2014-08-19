$.widget('task.filterItems', {
	$select: null,

	options: {
		filters: []
	},

	_init: function() {
		this.$select = $('#item-filter', this.element);

		this.$select.on('change', $.proxy(this.onSelectionChange, this));
	},

	_create: function() {
		var tmpl = nunjucks.render('templates/filterItemsTemplate.html', {filters: this.options.filters});
		this.element.html(tmpl);
	},

	onSelectionChange: function() {
		var selectedValue = this.$select.find(':selected').val(),
			selectedFilter = _.find(this.options.filters, function(e, i) {
				return e.value === selectedValue;
			});

		this.element.trigger('filterSelected', {selectedFilter: selectedFilter});
	}
});$.widget('task.itemContainer', {
	
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

});;$.widget('task.searchItems', {

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
		var tmpl = nunjucks.render('templates/searchItemsTemplate.html');
		this.element.html(tmpl);
	},
	triggerSearchEvent: function() {
		this.element.trigger('search', {searchStr: this.$search.val()});
	}
});$.widget('task.selectItems', {

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
});$.widget('task.selectItemsDialog', $.ui.dialog, {
	
	$itemContainer: null,
	$filter: null,
	$search: null,
	$selectedItems: null,

	filters: [{
		predicate: function(i, e) {
			return true;
		},
		label: 'No filter',
		value: 'noFilter'
	}, {
		predicate: function(i, e) {
			return e > 10;
		},
		label: "Greater than 10",
		value: 'gt10'
	}],

	options: {
		items: []
	},

	open: function() {
		var tmpl = nunjucks.render('templates/selectItemsDialogTemplate.html', {
			items: this.options.items
		});
		this.element.html(tmpl)

		this.$itemContainer = $('.js-items-container', this.element);
		this.$filter = $('.js-filter', this.element);
		this.$search = $('.js-search', this.element);
		this.$selectedItems = $('.js-selected-items', this.element);

		this.prepareItems();
		this.attachHandlers();
		this.initWidgets();

		return this._super();
	},

	initWidgets: function() {
		this.$itemContainer.itemContainer();
		this.$filter.filterItems({filters: this.filters});
		this.$search.searchItems();
	},

	attachHandlers: function() {
		this.$search.on('search', function(e, data) {
			console.log('search', data);
		});
		this.$filter.on('filterSelected', function (e, data) {
			console.log('filter', data)
		})
	},

	prepareItems: function() {
		this.options.items.map(function(i, e, array) {
			return e;
		})
	}
});$.widget('task.selectedItems', {
	_init: function() {},
	_create: function() {}
});;(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/filterItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<label for=\"item-filter\">Filter:</label>\r\n\t<select id=\"item-filter\">\r\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "filters");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("filter", t_4);
output += "\r\n\t\t\t<option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"value", env.autoesc), env.autoesc);
output += "\" ";
if(runtime.memberLookup((t_4),"selected", env.autoesc)) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"label", env.autoesc), env.autoesc);
output += "</option>\r\n\t\t";
;
}
}
frame = frame.pop();
output += "\r\n\t</select>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/itemContainer.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"item-container\">\r\n\t<ul class=\"item-list\"></ul>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/itemListTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
output += "\r\n\t<li>";
output += runtime.suppressValue(t_4, env.autoesc);
output += "</li>\r\n";
;
}
}
frame = frame.pop();
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/searchItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<label for=\"item-search\">Search:</label>\r\n\t<input type=\"text\" id=\"item-search\"/>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectItemsDialogTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"js-search\"></div>\r\n\t<div class=\"js-filter\"></div>\r\n\t<div class=\"js-items-container\"></div>\r\n\t<div class=\"js-selected-items\"></div>\r\n\t<div class=\"js-confirm\">\r\n\t\t<a class=\"button js-confirm-button\" href=\"#\">Select</a>\r\n\t\t<a class=\"button js-cancel-button\" href=\"#\">Cancel</a>\r\n\t</div>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"selected-items js-selected-items\"></div>\r\n\t<a class=\"button js-edit-selection\" href=\"#\">Edit selection</a>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/selectedItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
