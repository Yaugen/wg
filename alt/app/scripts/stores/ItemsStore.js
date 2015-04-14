import alt from '../alt'
import FiltersStore from './FiltersStore'
import FiltersActions from '../actions/FiltersActions'
import ItemsActions from '../actions/ItemsActions'

class ItemsStore {
    constructor() {
        this.bindListeners({
            handleSelectItem: ItemsActions.SELECT_ITEM,
            handleUnselectItem: ItemsActions.UNSELECT_ITEM,
            handleFilter: FiltersActions.FILTER,
            handleSearch: FiltersActions.SEARCH
        });

        this.items = [];
        this.displayItems = this.items;
        this.selectedItems = [];

        for(var i=0; i< 1000 ; i++) {
            this.items.push({id: i, text: Math.random().toString(36).substring(2,10), selected: false});
        }
    }

    handleSelectItem(item) {
        this.selectedItems.push(item);
        this.markItem(item, true);
    }

    handleUnselectItem(item) {
        var index = this.selectedItems.indexOf(item);
        if(index >= 0) {
            this.selectedItems.splice(index, 1);
        }
        this.markItem(item, false);
    }

    handleFilter() {
        this.waitFor(FiltersStore);

        var filter = FiltersStore.getState().currentFilter;

        this.displayItems = this.items.filter((item) => filter.condition(item.id));
    }

    handleSearch() {
        this.waitFor(FiltersStore);

        var search = FiltersStore.getState().currentSearch;

        this.displayItems = this.items.filter((item) => item.text.indexOf(search) >=0 );
    }

    markItem(item, selected) {
        var index = this.items.indexOf(item);
        if(index >= 0) {
            this.items[index].selected = selected;
        }
    } 
}

export default alt.createStore(ItemsStore, 'ItemsStore')