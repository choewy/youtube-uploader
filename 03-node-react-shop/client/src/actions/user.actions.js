import { customAxios } from '../utils/axios';

export const authorizeAction = async () => {
  return customAxios()
    .get('/api/users/me')
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const signupAction = async (user) => {
  return customAxios()
    .post('/api/users/signup', user)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const signinAction = async (user) => {
  return customAxios()
    .post('/api/users/signin', user)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const signoutAction = async () => {
  return customAxios()
    .delete('/api/users/signout')
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
