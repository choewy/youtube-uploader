import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const customAxios = () => {
  const token = cookies.get('token');
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }
  return axios;
};
