import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from './components/app/App';

import { Provider } from 'react-redux';

import store from './utils/CreateStore';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
