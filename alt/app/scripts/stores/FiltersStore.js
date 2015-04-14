import alt from '../alt'
import FiltersActions from '../actions/FiltersActions'

class FiltersStore {
	constructor() {
		this.bindListeners({
			handleSearch: FiltersActions.SEARCH,
			handleFilter: FiltersActions.FILTER
		});

		this.availableFilters = [{

			condition: (item) => true,
			label: 'All'
		}, {
			condition: (item) => item > 5,
			label: 'More than 5'
		}];

		this.availableFilters = this.availableFilters.map((item, index) => { 
			item.id = index;
			return item;
		});
		this.currentFilter = this.availableFilters[0]; 
		this.currentSearch = '';
	}

	handleSearch(query) {
		this.currentSearch = query;
	}

	handleFilter(filter) {
		this.currentFilter = filter;
	}
}

export default alt.createStore(FiltersStore, 'FiltersStore'); 