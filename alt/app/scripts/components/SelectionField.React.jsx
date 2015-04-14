import React from 'react'
import SelectionItem from '../components/SelectionItem.React.jsx'
import ItemsStore from '../stores/ItemsStore'

export default class SelectionField extends React.Component {
	constructor(props) {
		super(props);
		this.state = ItemsStore.getState();
	}

	componentDidMount() {
		ItemsStore.listen(this.onStoreChange.bind(this));
	}

	componentWillUnmount() {
		ItemsStore.unlisten(this.onStoreChange.bind(this))
	}

	onStoreChange(state) {
		this.setState(state);
	}

	render() {
		var items = this.state.selectedItems.map((item) => <SelectionItem deletable="true" item={item} key={item.id + '_field'}/>);
		return (
			<ul className="selection-field">
				{items}
			</ul>
		);
	}
}