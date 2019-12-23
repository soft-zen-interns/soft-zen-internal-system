import React, { Component } from 'react';

import Table from '../common/Table';
import LoadingSpinner from '../common/LoadingSpinner';

import { connect } from 'react-redux';

//import { getClients } from '../../actions/clients/ClientsActions';

import { getClients } from '../../api/clients/ClientsAPI';

import { columns } from '../constants/table/Clients';

class Clients extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clients: [],
			loading: false
		};
	}

	async componentDidMount() {
		this.setState({ loading: true });
		const clients = await getClients();
		this.setState({ clients: clients.data, loading: false });
	}

	render() {
		if (this.state.loading) {
			return <LoadingSpinner />;
		}

		return (
			<div>
				<Table columns={columns} data={this.state.clients} />
			</div>
		);
	}
}

// function mapStateToProps(state) {
// 	return {
// 		clients: state.clients.clients,
// 		clientsLoading: state.clients.loading
// 	};
// }

export default Clients;

//export default connect(mapStateToProps, null)(Clients);
