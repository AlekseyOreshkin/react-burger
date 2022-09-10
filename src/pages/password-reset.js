import React, { useCallback, useEffect, useState }  from 'react';

import styles from './password-recover.module.css';
import AppHeader from '../components/app-header/app-header'
import { CommonForm } from '../components/common-form';
import { Link, useHistory } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from '../services/actions/resetPassword';
import { RESET_PASSWORD_STEP_LOGIN, RESET_PASSWORD_STEP_RECOVER } from '../utils/constants';


export const PasswordResetPage = () => {
    const {step, message} = useSelector(state => state.resetPassword);
    const [form, setValue] = useState({password: '', token: ''});
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (step === RESET_PASSWORD_STEP_RECOVER) {
            history.replace({pathname: '/forgot-password'});
        } else if (step === RESET_PASSWORD_STEP_LOGIN) {
            history.replace({pathname: '/login'});
        }
    }, [history, step]);
    // token - код из письма
    const onSubmit = useCallback(e => {
        e.persist();
        e.preventDefault();
        dispatch(setPassword(form, RESET_PASSWORD_STEP_LOGIN, RESET_PASSWORD_STEP_RECOVER));
    }, [dispatch, form]);

    const onChangeValue = useCallback(e => {
        e.persist();
        e.preventDefault();
        setValue( {...form, [e.target.name]: e.target.value});
    }, [form, setValue]);
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Восстановление пароля' submitText='Сохранить' onSubmit={onSubmit}>
                    <PasswordInput  name='password' value={form.password} placeholder='Введите новый пароль' onChange={onChangeValue} />
                    <Input type='text' name='token'  value={form.token} placeholder='Введите код из письма' onChange={onChangeValue} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">{message}</p>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      </div>);
}