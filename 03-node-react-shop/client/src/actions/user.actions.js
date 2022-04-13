import axios from 'axios';

export const authorizeAction = async () => {
  return axios
    .get('/api/users/auth')
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const signupAction = async (user) => {
  return axios
    .post('/api/users', user)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const signinAction = async (user) => {
  return axios
    .post('/api/users/sign', user)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const signoutAction = async () => {
  return axios
    .delete('/api/users/out')
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
