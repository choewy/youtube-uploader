import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  ({ data }) => Promise.resolve(data),
  ({ response: { data } }) => Promise.reject(data),
);
