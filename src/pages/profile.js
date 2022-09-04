import React  from 'react';

import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header'
//import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


export const ProfilePage = () => {
  const name = '';
  const email = '';
  const password = '';
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
          <div className={styles.lkMenu}>
            <p className="text text_type_main-medium">Профиль</p>
            <p className="text text_type_main-medium text_color_inactive">История заказов</p>
            <p className="text text_type_main-medium text_color_inactive">Выход</p>
            <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
          </div>
            <div className='form-area'>
                  <Input type='text' value={name} placeholder='Имя' onChange={() => {}} />
                  <Input type='email' value={email} placeholder='E-mail' onChange={() => {}} />
                  <PasswordInput onChange={() => {}} value={password} name={'password'} />
            </div>
        </div>
      </div>);
}