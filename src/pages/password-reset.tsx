import { useCallback, useEffect }  from 'react';

import styles from './password-recover.module.css';
import { CommonForm } from '../components/common-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from '../services/actions/resetPassword';
import { RESET_PASSWORD_STEP_LOGIN, RESET_PASSWORD_STEP_RECOVER } from '../utils/constants';
import { useForm } from '../hooks/useForm';
import { ILocationState, IResetPasswordState, IState } from '../utils/types';


export const PasswordResetPage = () => {
    const {step, message} = useSelector<IState, IResetPasswordState>(state => state.resetPassword);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const {form, handleChange} = useForm({password: '', token: ''});


    useEffect(() => {

        const path = location.state.from.pathname;
        if (path !== '/forgot-password' && path !== '/reset-password') {
            history.replace({pathname: '/not-found', state: {from: location}});
            return;
        }

        if (step === RESET_PASSWORD_STEP_RECOVER 
            || step === RESET_PASSWORD_STEP_LOGIN) {
            history.replace({pathname: '/login', state: {from: location}});
        }
    }, [history, step, location]);
    // token - код из письма
    const onSubmit = useCallback(e => {
        e.persist();
        e.preventDefault();
        dispatch(setPassword(form, RESET_PASSWORD_STEP_LOGIN, RESET_PASSWORD_STEP_RECOVER));
    }, [dispatch, form]);

    return (
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Восстановление пароля' submitText='Сохранить' onSubmit={onSubmit}>
                    <PasswordInput  name='password' value={form.password} onChange={handleChange} />
                    <Input type='text' name='token'  value={form.token} placeholder='Введите код из письма' onChange={handleChange} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">{message}</p>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      );
}