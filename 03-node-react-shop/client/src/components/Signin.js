import { useState } from 'react';
import { signinAction } from '../actions/user.actions';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const valuesChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setValues({ ...values, [name]: value });
  };

  const valuesSubmit = async (e) => {
    e.preventDefault();
    const { ok, message } = await signinAction(values);
    if (!ok) return alert(message);
    window.location.pathname = '/';
  };

  return (
    <div className="signup">
      <form onSubmit={valuesSubmit}>
        <h1>로그인</h1>
        <input
          type="text"
          name="email"
          placeholder="이메일"
          autoComplete="off"
          value={values.email}
          onChange={valuesChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="off"
          value={values.password}
          onChange={valuesChange}
        />

        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Signin;
