import React, { useState, useCallback }  from 'react';

import styles from './register.module.css';
import AppHeader from '../components/app-header/app-header'
import { CommonForm } from '../components/common-form';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../services/actions/authInfo';


export const RegisterPage = () => {
    const loggedIn = useSelector(state => state.authInfo.success);
    const dispatch = useDispatch()
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const onChange = e => {
        e.persist();
        e.preventDefault();
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const handleRegister = useCallback(e => {
        e.persist();
        e.preventDefault();
        dispatch(register(form));
    }, [form, dispatch]);
    if (loggedIn) {
        return (<Redirect to={{ pathname: '/' }} />
        );
    }
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Регистрация' submitText='Зарегистрироваться' onSubmit={handleRegister} >
                    <Input type='text' name='name' placeholder='Имя' value={form.name} onChange={onChange} />
                    <EmailInput name='email' value={form.email} onChange={onChange} />
                    <PasswordInput onChange={onChange} value={form.password} name='password' />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      </div>);
}