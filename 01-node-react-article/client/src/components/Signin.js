import React, { useState } from 'react';
import { authSigninAction } from '../actions/auth.actions';

const Signin = (props) => {
    const { setUser } = props;
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setState({ ...state, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await authSigninAction(state, setUser, alert);
    };

    return (
        <div className='signin-wrapper'>
            <form className='signin-form' onSubmit={submitHandler}>
                <input className='signin-input'
                    type='text'
                    name='email'
                    autoComplete='off'
                    placeholder='이메일'
                    value={state.email}
                    onChange={changeHandler} />

                <input className='signin-input'
                    type='password'
                    name='password'
                    autoComplete='off'
                    placeholder='비밀번호'
                    value={state.password}
                    onChange={changeHandler} />

                <button className='signin-button' type='submit'>
                    로그인
                </button>
            </form>
        </div>
    );
};

export default Signin;