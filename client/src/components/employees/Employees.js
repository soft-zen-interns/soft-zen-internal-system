import React, { Component } from 'react';

import Table from '../common/Table';
import LoadingSpinner from '../common/LoadingSpinner';

import { connect } from 'react-redux';

//import { getEmployees } from '../../actions/employees/EmployeesActions';

import { getEmployees } from '../../api/employees/EmployeesAPI';

import { columns } from '../constants/table/Employees';

class Employees extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employees: [],
			loading: false
		};
	}

	async componentDidMount() {
		this.setState({ loading: true });
		const employees = await getEmployees();
		this.setState({ employees: employees.data, loading: false });
	}

	render() {
		if (this.state.loading) {
			return <LoadingSpinner />;
		}

		return (
			<div>
				<Table columns={columns} data={this.state.employees} />
			</div>
		);
	}
}

// function mapStateToProps(state) {
// 	return {
// 		employees: state.employees.employees,
// 		employeesLoading: state.employees.loading
// 	};
// }

export default Employees;

// export default connect(mapStateToProps, null)(Employees);