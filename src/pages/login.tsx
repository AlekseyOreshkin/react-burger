import styles from './login.module.css';
import { CommonForm, IFormData } from '../components/common-form';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../services/actions/auth-info';
import { useForm } from '../hooks/use-form';
import { ILoginForm } from '../utils/types';
import { useDispatch, useSelector } from '..';

export const LoginPage = () => {
    const email = useSelector(state => state.authInfo.user.email);
    const authorized = useSelector(state => state.authInfo.success);
    const dispatch = useDispatch();
    const { form, handleChange } = useForm<ILoginForm>({ email: email, password: '' });
    const location = useLocation<{ from: string }>();


    const handleLogin = ({ email, password }: IFormData) => {
        dispatch(login({ email, password }));
    };

    if (authorized) {
        return (<Redirect to={location?.state?.from || '/'} />);
    }


    return (
        <div className={styles.main} >
            <div className='form-area'>
                <CommonForm headerText='Вход' submitText='Войти' onSubmit={handleLogin} >
                    <EmailInput name='email' value={form.email} onChange={handleChange} />
                    <PasswordInput value={form.password} name={'password'} onChange={handleChange} />
                </CommonForm>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                <p className="text text_type_main-default text_color_inactive"> Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
        </div>
    );
};