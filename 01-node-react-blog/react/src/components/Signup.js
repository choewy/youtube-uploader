import React, { useState } from 'react';
import { authSignupAction } from '../actions/auth.actions';

const Signup = (props) => {
    const { setUser } = props;
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setState({ ...state, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await authSignupAction(state, setUser, alert);
    };

    return (
        <div className="signup-wrapper">
            <form className="signup-form" onSubmit={submitHandler}>
                <input className="signup-input"
                    type='text'
                    name='name'
                    autoComplete='off'
                    placeholder='이름'
                    value={state.name}
                    onChange={changeHandler} />

                <input className="signup-input"
                    type='text'
                    name='email'
                    autoComplete='off'
                    placeholder='이메일'
                    value={state.email}
                    onChange={changeHandler} />

                <input className="signup-input"
                    type='password'
                    name='password'
                    autoComplete='off'
                    placeholder='비밀번호'
                    value={state.password}
                    onChange={changeHandler} />

                <input className="signup-input"
                    type='password'
                    name='confirmPassword'
                    autoComplete='off'
                    placeholder='비밀번호 확인'
                    value={state.confirmPassword}
                    onChange={changeHandler} />

                <button className="signup-button" type='submit'>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Signup;