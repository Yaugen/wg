import React from 'react'
import FiltersStore from '../stores/FiltersStore'
import FiltersActions from '../actions/FiltersActions'

export default class SelectionFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = FiltersStore.getState();
	}

	componentDidMount() {
		FiltersStore.listen(this.onStateChange.bind(this));
	}

	componentWillUnmount() {
		FiltersStore.unlisten(this.onStateChange.bind(this));     
	}

	onStateChange(state) {
		this.setState(state);
	}

	filterChange(event, item) {
		var selectedItemId = event.target.selectedOptions[0].attributes['data-id'].value,
			filter = this.state.availableFilters.filter((item) => item.id == selectedItemId)[0];
		if(filter) {
			FiltersActions.filter(filter);
		}
	}

	searchChange(event, item) {
		let query = event.target.value;
		FiltersActions.search(query);
	}

	render() {
		let options = this.state.availableFilters.map((item) => <option data-id={item.id}>{item.label}</option>);

		return (
			<div className="selection-filters">
				<input placeholder="Search query" type="text" onChange={this.searchChange.bind(this)} />
				<select onChange={this.filterChange.bind(this)} >
					{options}
				</select>
			</div>
		);
	}
}
