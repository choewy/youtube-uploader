import { useState } from 'react';
import { signupAction } from '../actions/user.actions';

const Signup = (props) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const valuesChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setValues({ ...values, [name]: value });
  };

  const valuesSubmit = async (e) => {
    e.preventDefault();
    await signupAction(values);
  };

  return (
    <div>
      <form onSubmit={valuesSubmit}>
        <input
          type="text"
          name="name"
          placeholder=""
          value={values.name}
          onChange={valuesChange}
        />
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={valuesChange}
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={valuesChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={valuesChange}
        />
      </form>
    </div>
  );
};

export default Signup;
