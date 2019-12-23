import { GET_CLIENTS, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL } from '../types/Types';
import * as API from '../../api/clients/ClientsAPI';

export function getClients() {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_CLIENTS });
			const response = API.getClients();

			console.log('Response: ' + JSON.stringify(response));

			dispatch({ type: GET_CLIENTS_SUCCESS, payload: response.data });
		} catch (e) {
			dispatch({ type: GET_CLIENTS_FAIL, payload: 'Cannot get clients' });
		}
	};
}
