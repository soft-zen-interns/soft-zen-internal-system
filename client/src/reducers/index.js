import { combineReducers } from 'redux';

import clientsReducer from './clients/ClientsReducer';

const rootReducer = combineReducers({
	clients: clientsReducer
});

export default rootReducer;
