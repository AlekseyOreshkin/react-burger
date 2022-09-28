import { useCallback }  from 'react';

import styles from './register.module.css';
import { CommonForm } from '../components/common-form';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/authInfo';
import { useForm } from '../hooks/useForm';
import { IProfileForm } from '../utils/types';


export const RegisterPage = () => {
    const dispatch = useDispatch()

    const {form, handleChange} = useForm<IProfileForm>({ email: '', password: '', name: '' });

    const handleRegister = useCallback(e => {
        e.persist();
        e.preventDefault();
        dispatch(register(form));
    }, [form, dispatch]);

    return (
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Регистрация' submitText='Зарегистрироваться' onSubmit={handleRegister} >
                    <Input type='text' name='name' placeholder='Имя' value={form.name} onChange={handleChange} />
                    <EmailInput name='email' value={form.email} onChange={handleChange} />
                    <PasswordInput onChange={handleChange} value={form.password} name='password' />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      );
}