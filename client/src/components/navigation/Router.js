import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SideNavigation from './SideNavigation';

import Projects from '../projects/Projects';
import Clients from '../clients/Clients';
import Employees from '../employees/Employees';
import Financials from '../financials/Financials';
import Documents from '../documents/Documents';
import Settings from '../settings/Settings';

const Router = () => (
	<BrowserRouter>
	<div style={{display: "flex"}}>
		<SideNavigation />

		<Switch>
			<Route path="/" exact component={Projects} />
			<Route path="/projects" component={Projects} />

			<Route path="/clients" component={Clients} />

			<Route path="/employees" component={Employees} />

			<Route path="/financials" component={Financials} />

			<Route path="/documents" component={Documents} />

			<Route path="/settings" component={Settings} />

			{/* <Route component={NotFound} /> */}
		</Switch>
	</div>
	</BrowserRouter>
);

export default Router;
