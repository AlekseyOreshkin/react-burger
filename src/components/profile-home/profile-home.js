import React, { useState } from "react";
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-home.module.css';
import { useSelector } from "react-redux";

export const ProfileHome = () => {
    const { name, email } = useSelector(state => state.authInfo.user);
    const [password, setPassword] = useState('');
  
    return (
        <div className={styles.main}>
                <Input type='text' value={name} placeholder='Имя' onChange={() => {}} />
                <Input type='email' value={email} placeholder='E-mail' onChange={() => {}} />
                <PasswordInput onChange={setPassword} value={password} name={'password'} />
        </div>
    );
}