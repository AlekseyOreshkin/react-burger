import React, { useState, useCallback }  from 'react';

import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header'
import { CommonForm } from '../components/common-form';
import { Link, Redirect } from 'react-router-dom';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions/authInfo';


export const LoginPage = () => {
    const loggedIn = useSelector(state => state.authInfo.success);
    const email = useSelector(state => state.authInfo.user.email);

    const dispatch = useDispatch()
    const [form, setValue] = useState({ email: email, password: '' });
    const onChange = e => {
        e.persist();
        e.preventDefault();
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const handleLogin = useCallback(e => {
        e.persist();
        e.preventDefault();
        dispatch(login(form));
    }, [form, dispatch]);

    if (loggedIn) {
        return (<Redirect to={{ pathname: '/' }} />
        );
    }
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Вход' submitText='Войти' onSubmit={handleLogin} >
                    <EmailInput name='email' value={form.email} onChange={onChange} />
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                <p className="text text_type_main-default text_color_inactive"> Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
        </div>
      </div>);
}