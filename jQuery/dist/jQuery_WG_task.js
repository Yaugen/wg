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
		var tmpl = nunjucks.render('filterItemsTemplate.html', {filters: this.options.filters});
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
	
	$itemList: null,
	$itemContainer: null,

	lastItemIndex: 0,

	options: {
		items: [],
		selectedItems: [],
		visibleItemStep: 15,
		disabled: false
	},

	_init: function() {
		this.$itemList = $('.item-list', this.element);
		this.$itemContainer = $('.item-container', this.element);

		this.renderItems();
		this.attachHandlers();
	},

	_create: function() {
		var tmpl = nunjucks.render('itemContainer.html');
		this.element.html(tmpl);
	},

	renderItems: function(append) {
		var next = this.options.items.slice(this.lastItemIndex, this.lastItemIndex + this.options.visibleItemStep),
			that = this,
			tmpl;
		next = next.map(function(e, i) {
			return {
				item: e, 
				selected: that.options.selectedItems.indexOf(e) >= 0,
				disabled: that.options.disabled
			};
		});

		tmpl = nunjucks.render('itemListTemplate.html', {items: next, showClose: false});

		if(append) {
			this.$itemList.append(tmpl);
		} else {
			this.$itemList.html(tmpl);
		}
		this.lastItemIndex += this.options.visibleItemStep;
	},

	attachHandlers: function() {
		this.$itemContainer.on('scroll', $.proxy(this.onContainerScroll, this));
		this.$itemContainer.on('click', '.item-wrap', $.proxy(this.toggleItem, this));
	},

	replaceItems: function(items) {
		this.options.items = items;
		this.lastItemIndex = 0;
		this.renderItems();
	},

	onContainerScroll: function(e) {
		if(this.$itemContainer.scrollTop() + this.$itemContainer.innerHeight() >= e.target.scrollHeight) {
            this.renderItems(true);
        }
	},

	toggleItem: function(e, item) {
		var $item = $(e.currentTarget),
			item = $item.data('item'),
			itemIndex = this.options.selectedItems.indexOf(item);

		if(itemIndex >= 0) {
			$item.removeClass('selected');
			this.element.trigger('itemRemoved', item);

		} else if(!this.options.disabled) {
			$item.addClass('selected');
			this.element.trigger('itemSelected', item);
		}
	},

	toggleDiableSelection: function() {
		var $disabled = this.$itemList.find('.item-wrap.disabled');
		if($disabled.length > 0) {
			$disabled.removeClass('disabled');
		} else {
			this.$itemList.find('.item-wrap:not(.selected)').addClass('disabled');
		}
		this.options.disabled = !this.options.disabled;
	},

	unselectItem: function(item) {
		var itemIndex = this.options.selectedItems.indexOf(item),
			$item;

		if(itemIndex >= 0) {
			$item = $('.item-wrap[data-item="' + item + '"]');
			$item.removeClass('selected');
		}
	}


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
		var tmpl = nunjucks.render('searchItemsTemplate.html');
		this.element.html(tmpl);
	},
	triggerSearchEvent: function() {
		this.element.trigger('search', {searchStr: this.$search.val()});
	}
});$.widget('task.selectItems', {

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
});$.widget('task.selectItemsDialog', $.ui.dialog, {
	
	$itemContainer: null,
	$filter: null,
	$search: null,
	$selectedItems: null,
	$confirmButton: null,
	$cancelButton: null,

	filters: [{
		predicate: function(e, i) {
			return true;
		},
		label: 'No filter',
		value: 'noFilter'
	}, {
		predicate: function(e, i) {
			return i > 10;
		},
		label: "Greater than 10",
		value: 'gt10'
	}, {
		predicate: function(e, i) {
			return i > 100;
		},
		label: "Greater than 100",
		value: 'gt100'
	}],

	options: {
		items: [],
		selectedItems: [],
		maxSelectedItems: 10
	},

	open: function() {
		var tmpl = nunjucks.render('selectItemsDialogTemplate.html', {
			items: this.options.items
		});
		this.element.html(tmpl)

		this.$itemContainer = $('.js-items-container', this.element);
		this.$filter = $('.js-filter', this.element);
		this.$search = $('.js-search', this.element);
		this.$selectedItems = $('.js-selected-items', this.element);
		this.$confirmButton = $('.js-confirm-button', this.element);
		this.$cancelButton = $('.js-cancel-button', this.element);

		this.attachHandlers();
		this.initWidgets();

		this.currentFilter = {
			predicate: function() {
				return true;
			}
		}

		return this._super();
	},

	initWidgets: function() {
		this.$itemContainer.itemContainer({
			items: this.options.items, 
			selectedItems: this.options.selectedItems,
			disabled: this.options.selectedItems.length == this.options.maxSelectedItems
		});
		this.$filter.filterItems({
			filters: this.filters
		});
		this.$search.searchItems();
		this.$selectedItems.selectedItems({
			selectedItems: this.options.selectedItems
		});
	},

	attachHandlers: function() {

		this.$search.on('search', $.proxy(function(e, data) {
			console.log('search', data);
			this.currentSearchString = data.searchStr.toLowerCase();
			this.filterItems();
		},this));

		this.$filter.on('filterSelected', $.proxy(function (e, data) {
			console.log('filter', data)
			this.currentFilter = data.selectedFilter;
			this.filterItems();
		}, this));

		this.$selectedItems.on('itemRemoved', $.proxy(this.itemRemoved, this));
		this.$itemContainer.on('itemSelected', $.proxy(this.itemSelected, this));
		this.$itemContainer.on('itemRemoved', $.proxy(this.itemRemoved, this));

		this.$confirmButton.on('click', $.proxy(this.confirmSelection, this));
		this.$cancelButton.on('click', $.proxy(function() { this.close() }, this));
	},

	filterItems: function() {
		var that = this,
			filtered = [];

		filtered = _(this.options.items)
		.filter(that.currentFilter.predicate)
		.filter(function(e, i) {
			if(!that.currentSearchString) {
				return true;
			} else {
				return e.toLowerCase().indexOf(that.currentSearchString) >= 0;
			}
		})

		this.$itemContainer.itemContainer('replaceItems', filtered);
	},

	itemSelected: function(e, item) {
		this.options.selectedItems.push(item);
		this.$selectedItems.selectedItems('addItem', item);
		this.checkSelectionCount();
	},

	itemRemoved: function(e, item) {
		var itemIndex = this.options.selectedItems.indexOf(item);

		this.checkSelectionCount();
		if(itemIndex >= 0) {
			this.$itemContainer.itemContainer('unselectItem', item);
			this.$selectedItems.selectedItems('removeItem', item);
			this.options.selectedItems.splice(itemIndex, 1);
		}
	},

	confirmSelection: function() {
		this.element.trigger('selectionConfirmed', {selectedItems: this.options.selectedItems});
		this.close();
	},

	checkSelectionCount: function() {
		if(this.options.selectedItems.length == this.options.maxSelectedItems) {
			this.$itemContainer.itemContainer('toggleDiableSelection');
		}
	}

});$.widget('task.selectedItems', {

	$selectedItemsList: null,

	options: {
		selectedItems: []
	},

	_init: function() {
		this.$selectedItemsList = $('.selected-items', this.element);
		this.attachHandlers();
	},
	_create: function() {
		var items = this.options.selectedItems.map(function(e, i) {
			return {item: e, selected: true};
		});
		tmpl = nunjucks.render('selectedItemsTemplate.html', {
			items: items,
			showClose: true
		});
		this.element.html(tmpl);
	},
	attachHandlers: function() {
		this.$selectedItemsList.on('click', '.js-delete-item', $.proxy(this.onItemRemoved, this));
	},
	getItems: function() {
		return this.options.selectedItems;
	},
	addItem: function(item) {
		var itemTmpl = nunjucks.render('itemTemplate.html', {
			showClose: true,
			item: {
				item: item, 
				selected: true
			}
		});
		this.$selectedItemsList.append(itemTmpl);
	},
	removeItem: function(item) {
		if(this.options.selectedItems.indexOf(item) >= 0) {
			this.$selectedItemsList.find('.item-wrap[data-item="' + item + '"]').remove();
		}
	},
	onItemRemoved: function(e) {
		var item = $(e.target).parents('.item-wrap').data('item');
		this.removeItem(item);
		this.element.trigger('itemRemoved', item);
	}
});;(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["filterItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["itemContainer.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["itemListTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
output += "\r\n\t";
env.getTemplate("itemTemplate.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\r\n";
})});
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["itemTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<li class=\"item-wrap ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"selected", env.autoesc)) {
output += "selected";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"disabled", env.autoesc)) {
output += "disabled";
;
}
;
}
output += "\"  data-item=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"item", env.autoesc), env.autoesc);
output += "\" >\r\n\t<div class=\"item\">\r\n\t\t<span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"item", env.autoesc), env.autoesc);
output += "</span>\r\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "showClose")) {
output += "\r\n\t\t\t<i class=\"icon icon-close js-delete-item\">X</i>\r\n\t\t";
;
}
output += "\r\n\t</div>\r\n</li>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["searchItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["selectItemsDialogTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"select-items-dialog\">\r\n\t<div class=\"js-search search-box\"></div>\r\n\t<div class=\"js-filter filter-box\"></div>\r\n\t<div class=\"js-items-container item-container-wrap\"></div>\r\n\t<div class=\"js-selected-items selected-items\"></div>\r\n\t<div class=\"js-confirm button-container\">\r\n\t\t<a class=\"button js-confirm-button\" href=\"#\">Select</a>\r\n\t\t<a class=\"button js-cancel-button\" href=\"#\">Cancel</a>\r\n\t</div>\r\n</div>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["selectItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\r\n\t<div class=\"selected-items js-selected-items\"></div>\r\n\t<div class=\"js-dialog\"></div>\r\n\t<a class=\"button js-edit-selection\" href=\"#\">Edit selection</a>\r\n</div>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["selectedItemsContainerTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["selectedItemsTemplate.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<ul class=\"selected-items\">\r\n\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
output += "\r\n\t\t";
env.getTemplate("itemTemplate.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\r\n\t";
})});
}
}
frame = frame.pop();
output += "\r\n</ul>";
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
