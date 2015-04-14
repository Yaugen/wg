import React from 'react'
import ItemsActions from '../actions/ItemsActions'

export default class SelectionItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = props;
	}

	handleClick() {
		if(this.state.deletable) {
			return;
		}
		if(this.state.item.selected) {
			ItemsActions.unselectItem(this.state.item);
		} else {
			ItemsActions.selectItem(this.state.item);
		}
	}

	handleDeleteClick() {
		ItemsActions.unselectItem(this.state.item);
	}

	render() {
		var classList = 'selection-item' + (this.state.item.selected? ' selected' : ''),
			deletable = this.state.deletable ? <span className="delete" onClick={this.handleDeleteClick.bind(this)}>x</span> : '';

		return (
			<li className={classList} onClick={this.handleClick.bind(this)}>
				<span>{this.state.item.text}</span>
				{deletable}
			</li>
		);
	}
}