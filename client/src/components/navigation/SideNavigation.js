import React, { Component } from 'react';
import { Toggle, Sidenav, Nav, Dropdown, Icon } from 'rsuite';

import { NAV_ITEMS } from './Constants';

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

	renderNavItems = () => {
		return NAV_ITEMS.map((item, index) => {
			return (
				<Nav.Item eventKey={index} icon={<Icon icon={item.iconName} />}>
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
					<Toggle
						onChange={this.handleToggle}
						checked={expanded}
						checkedChildren={<Icon icon="check" />}
						unCheckedChildren={<Icon icon="close" />}
						style={{ margin: '3% 9%' }}
					/>
					<Sidenav.Body>
						<Nav>{this.renderNavItems()}</Nav>
					</Sidenav.Body>
				</Sidenav>
			</div>
		);
	}
}

export default SideNavigation;
