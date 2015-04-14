import React from 'react'
import SelectionFilters from './SelectionFilters.React.jsx'
import SelectionItem from './SelectionItem.React.jsx'
import ItemsStore from '../stores/ItemsStore'

export default class SelectionWell extends React.Component {
	constructor(props) {
		super(props);
		this.state = ItemsStore.getState();
	}

	componentDidMount() {
		ItemsStore.listen(this.onStoreChange.bind(this));
	}

	componentWillUnmount() {
		ItemsStore.unlisten(this.onStoreChange.bind(this));
	}

	onStoreChange(state) {
		this.setState(state);
	}

	render() {
		var items = this.state.displayItems.map((item) => <SelectionItem item={item} key={item.id + '_well'}/>);
		return (
			<div>
				<SelectionFilters />
				<ul className="selection-well">
					{items}
				</ul>
			</div>
		);
	}
} 