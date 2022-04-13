import axios from 'axios';

export const signupAction = async (user) => {
  try {
    const { data } = await axios.post('/api/users', user);
    return data;
  } catch (error) {
    return error;
  }
};

export const signinAction = async (user) => {
  try {
    const { data } = await axios.post('/api/users/sign', user);
    return data;
  } catch (error) {
    return error;
  }
};
