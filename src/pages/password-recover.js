import React  from 'react';

import styles from './password-recover.module.css';
import AppHeader from '../components/app-header/app-header'
import { CommonForm } from '../components/common-form';
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';


export const PasswordRecoverPage = () => {
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Восстановление пароля' submitText='Восстановить' >
                    <Input type='email' placeholder='E-mail' onChange={() => {}} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      </div>);
}