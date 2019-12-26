import axios from 'axios';

export const getEmployees = async () => {
  // return axios.get(
  //   `http://localhost:8000/employees/`,
  //   {
  //     headers: { 'x-auth-token': localStorage.getItem('token') }
  //   }
  // );
  return {
    data: [
      {
        name: 'Oleg',
        email: 'oleg@softzen.co',
        phone: '0888 888 888',
        country: 'Ukraine',
        experience: 'senior developer',
        skills: [
          'ReactJS',
          'React Native',
          'NodeJS'
        ],
        startDate: '01-01-2019',
        endDate: '',
        revenue: '$1000',
        cost: '$500',
        profit: '$500'
      },
      {
        name: 'Oleg2',
        email: 'oleg2@softzen.co',
        phone: '0999 888 888',
        country: 'Russia',
        experience: 'senior developer',
        skills: [
          'ReactJS',
          'React Native',
          'NodeJS'
        ],
        startDate: '01-05-2019',
        endDate: '',
        revenue: '$1500',
        cost: '$500',
        profit: '$1000'
      }
    ]
  };
}