import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

const products = [];

const columns = [{
	dataField: "name",
	text: "Name"
}, {
	dataField: "contactName",
	text: "Contact Name"
}, {
	dataField: "email",
	text: "Email"
}, {
	dataField: "type",
	text: "Type"
}, {
	dataField: "country",
	text: "Country"
}, {
	dataField: "totalRevenues",
	text: "Total Revenues"
}, {
	dataField: "totalCosts",
	text: "Total Cost"
}, {
	dataField: "totalProfit",
	text: "Total Profit"
}, {
	dataField: "startDate",
	text: "Start Date "
}, {
	dataField: "endDate",
	text: "End Date"
}];

class Table extends Component {
	state = {
		clients: []
	};

	componentDidMount() {
		const url = "http://localhost:8000/clients";
		axios.get(url).then(response => response.data).then(data => {
			this.setState({clients: data})
			console.log(this.state.clients)
		});
	}

	render() {
		return (
			<BootstrapTable 
				keyField = "name"
				data = {this.state.clients}
				columns = {columns}
			/>
		);
	}
}

export default Table;
