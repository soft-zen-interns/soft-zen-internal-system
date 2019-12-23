import axios from 'axios';

export const getClients = async () => {
	// return axios.get(
	// 	`/http://localhost:8000/clients/`,
	// 	{
	// 		//headers: { 'x-auth-token': localStorage.getItem('token') }
	// 	}
	// );
	return {
		data: [
			{
				name: 'Granular',
				contactName: 'Siddhart Gupta',
				email: 'granular@granular.ai',
				type: 'startup',
				country: 'USA',
				totalRevenues: '$1000',
				totalCosts: '$500',
				totalProfit: '$500',
				startDate: '01-01-2019',
				endDate: ''
			},
			{
				name: 'Granular2',
				contactName: 'Siddhart Gupta',
				email: 'granular@granular.ai',
				type: 'startup',
				country: 'USA',
				totalRevenues: '$1000',
				totalCosts: '$500',
				totalProfit: '$500',
				startDate: '01-01-2019',
				endDate: ''
			}
		]
	};
};
