import { GET_EMPLOYEES, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_FAIL } from '../types/Types';
import * as API from '../../api/employees/EmployeesAPI';

export function getEmployees() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_EMPLOYEES });
      const response = API.getEmployees();

      console.log('Response: ' + JSON.stringify(response));

      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: response.data});
    }
    catch(e) {
      dispatch({ type: GET_EMPLOYEES_FAIL, payload: 'Cannot get clients' });
    }
  }
}