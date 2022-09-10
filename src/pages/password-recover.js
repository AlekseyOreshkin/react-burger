import React, { useCallback, useEffect, useState }  from 'react';

import styles from './password-recover.module.css';
import { CommonForm } from '../components/common-form';
import { Link, useHistory } from 'react-router-dom';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword} from '../services/actions/resetPassword';
import { RESET_PASSWORD_STEP_RECOVER, RESET_PASSWORD_STEP_RESET } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';


export const PasswordRecoverPage = () => {
    const {step, message} = useSelector(state => state.resetPassword);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (step === RESET_PASSWORD_STEP_RESET) {
            history.replace({pathname: '/reset-password'});
        }
    }, [step, history, dispatch])

    const onChange = useCallback(e => {
        e.persist();
        e.preventDefault();
        setEmail(e.target.value);
    }, [setEmail])
    
    const onSubmit = useCallback( e => {
        e.persist();
        e.preventDefault();
        dispatch(resetPassword(email, RESET_PASSWORD_STEP_RESET, RESET_PASSWORD_STEP_RECOVER));
    }, [email, dispatch]);
    return (
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Восстановление пароля' submitText='Восстановить' onSubmit={onSubmit}>
                    <EmailInput name='email' value={email} onChange={onChange} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">{message}</p>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
        </div>
      );
}