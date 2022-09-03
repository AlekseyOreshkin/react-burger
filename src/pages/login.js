import React  from 'react';

import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header'
import { CommonForm } from '../components/common-form';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


export const LoginPage = () => {
    const email = '';
    const password = '';
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Вход' submitText='Войти' >
                    <Input type='email' value={email} placeholder='E-mail' onChange={() => {}} />
                    <PasswordInput onChange={() => {}} value={password} name={'password'} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                <p className="text text_type_main-default text_color_inactive"> Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
        </div>
      </div>);
}