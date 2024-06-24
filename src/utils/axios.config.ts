import _ from 'axios';

export const axios = _.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Add your API URL here
});

export default axios;
