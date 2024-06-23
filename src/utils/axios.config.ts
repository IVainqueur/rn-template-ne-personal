import _ from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axios = _.create({
  baseURL: '', // Add your API URL here
});

// Get the token from AsyncStorage
AsyncStorage.getItem('token')
  .then((token: string | null) => {
    // Set the token as the authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  })
  .catch((error: any) => {
    console.log('Error retrieving token from AsyncStorage:', error);
  });

export default axios;
