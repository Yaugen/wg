import React from 'react'
import SelectionField from './SelectionField.React.jsx'
import SelectionWell from './SelectionWell.React.jsx'

export default class SelectionControl extends React.Component {
	render() {
		return (
			<div className="selection-control">
				<SelectionWell />
				<SelectionField />
			</div>
		);
	}
}