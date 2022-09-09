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
    const [token, setToken] = useState('');
    const [password, setPwd] = useState('');
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
    const onSubmit = useCallback(() => {
        dispatch(setPassword(password, token, RESET_PASSWORD_STEP_LOGIN, RESET_PASSWORD_STEP_RECOVER));
    }, [dispatch, password, token]);

    const onChangePassword = useCallback(e => {
        e.persist();
        setPwd(e.target.value);
    }, [setPwd]);
    const onChangeToken = useCallback(e => {
        e.persist();
        setToken(e.target.value);
    }, [setToken]);
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Восстановление пароля' submitText='Сохранить' onSubmit={onSubmit}>
                    <PasswordInput value={password} password='Введите новый пароль' onChange={onChangePassword} />
                    <Input type='text'  value={token} placeholder='Введите код из письма' onChange={onChangeToken} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">{message}</p>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      </div>);
}