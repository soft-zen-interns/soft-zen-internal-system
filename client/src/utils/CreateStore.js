import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
//import * as actions from '../actions/Auth_action';
// import { notify, WARNING_TYPE } from '../components/common/utils/NotificationsUtils';

import reducers from '../reducers';

const authMiddleware = ({ dispatch }) => (next) => (action) => {
	console.log(action, ' -- CUSTOM ACTION LOGGER --');
	// if (action.status === 401) {
	// 	dispatch(actions.signoutUser());
	// 	//notify(WARNING_TYPE, 'Сесията Ви изтече. Моля, логнете се отново"');
	// } else {
	next(action);
	//}
};

const createStoreWithMiddleware = applyMiddleware(reduxThunk, authMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
