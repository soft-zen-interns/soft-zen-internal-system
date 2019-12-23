import { GET_CLIENTS, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL } from '../../actions/types/Types';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_CLIENTS:
			return { ...state, clients: action.payload, loading: true };
		case GET_CLIENTS_SUCCESS:
			return { ...state, clients: action.payload, loading: false };
		case GET_CLIENTS_FAIL:
			return { ...state, loading: false };
		default:
	}

	return state;
}
