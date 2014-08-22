$.widget('task.itemContainer', {
    
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


});