import alt from '../alt'

class FiltersActions {
	search(query) {
		this.dispatch(query);
	}

	filter(filter) {
		this.dispatch(filter);
	}
}

export default alt.createActions(FiltersActions)