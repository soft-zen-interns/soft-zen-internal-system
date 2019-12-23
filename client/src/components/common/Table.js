import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

class Table extends Component {
	render() {
		return (
			<BootstrapTable
				keyField="name"
				data={this.props.data}
				columns={this.props.columns}
				cellEdit={cellEditFactory({ mode: 'click' })}
			/>
		);
	}
}

export default Table;
