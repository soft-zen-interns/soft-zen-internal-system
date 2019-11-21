import React, { Component } from 'react';
import { Toggle, Sidenav, Nav, Icon } from 'rsuite';

import { NAV_ITEMS } from './Constants';

import '../../styles/navigation/SideNavigation.css';
import 'rsuite/dist/styles/rsuite-default.css';

class SideNavigation extends Component {
	constructor() {
		super();
		this.state = {
			expanded: false,
			activeKey: '0'
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

	renderToggle = () => {
		return (
			<Toggle
				onChange={this.handleToggle}
				checked={this.state.expanded}
				checkedChildren={<Icon icon="check" />}
				unCheckedChildren={<Icon icon="close" />}
			/>
		);
	};

	renderNavItems = () => {
		return NAV_ITEMS.map((item, index) => {
			return (
				<Nav.Item key={index} eventKey={index} icon={<Icon icon={item.iconName} />}>
					{item.navItem}
				</Nav.Item>
			);
		});
	};

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
					{this.renderToggle()}
					<Sidenav.Body>
						<Nav>{this.renderNavItems()}</Nav>
					</Sidenav.Body>
				</Sidenav>
			</div>
		);
	}
}

export default SideNavigation;