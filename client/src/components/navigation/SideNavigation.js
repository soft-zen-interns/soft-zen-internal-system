import React, { Component } from 'react';
import { Toggle, Sidenav, Nav, Dropdown, Icon } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

class SideNavigation extends Component {
	constructor() {
		super();
		this.state = {
			expanded: false,
			activeKey: '1'
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleToggle() {
		this.setState({
			expanded: !this.state.expanded
		});
	}
	handleSelect(eventKey) {
		this.setState({
			activeKey: eventKey
		});
	}
	render() {
		const { expanded } = this.state;

		return (
			<div style={{ width: 250 }}>
				<Sidenav
					expanded={expanded}
					defaultOpenKeys={[ '3', '4' ]}
					activeKey={this.state.activeKey}
					onSelect={this.handleSelect}
					style={{ height: '100vh' }}
				>
					<Toggle
						onChange={this.handleToggle}
						checked={expanded}
						checkedChildren={<Icon icon="check" />}
						unCheckedChildren={<Icon icon="close" />}
						style={{ margin: '3% 9%' }}
					/>
					<Sidenav.Body>
						<Nav>
							<Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
								Projects
							</Nav.Item>
							<Nav.Item eventKey="2" icon={<Icon icon="group" />}>
								Clients
							</Nav.Item>
							<Nav.Item eventKey="3" icon={<Icon icon="user-secret" />}>
								Employees
							</Nav.Item>
							<Nav.Item eventKey="4" icon={<Icon icon="money" />}>
								Financials
							</Nav.Item>
							<Nav.Item eventKey="5" icon={<Icon icon="book" />}>
								Documents
							</Nav.Item>
							<Nav.Item eventKey="5" icon={<Icon icon="cog" />}>
								Settings
							</Nav.Item>
						</Nav>
					</Sidenav.Body>
				</Sidenav>
			</div>
		);
	}
}

export default SideNavigation;
