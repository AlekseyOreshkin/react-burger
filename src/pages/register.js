import React  from 'react';

import styles from './register.module.css';
import AppHeader from '../components/app-header/app-header'
import { CommonForm } from '../components/common-form';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


export const RegisterPage = () => {
  const password = '';
  return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Регистрация' submitText='Зарегистрироваться' >
                    <Input type='text' placeholder='Имя' onChange={() => {}} />
                    <Input type='email' placeholder='E-mail' onChange={() => {}} />
                    <PasswordInput onChange={() => {}} value={password} name={'password'} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      </div>);
}