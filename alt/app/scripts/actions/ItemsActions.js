import alt from '../alt'

class ItemsActions {
	selectItem(item) {
		this.dispatch(item);
	}

	unselectItem(item) {
		this.dispatch(item);
	}
}

export default alt.createActions(ItemsActions)