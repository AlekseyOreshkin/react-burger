
import styles from './register.module.css';
import { CommonForm, IFormData } from '../components/common-form';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/actions/auth-info';
import { useForm } from '../hooks/use-form';
import { IProfileForm } from '../utils/types';
import { useDispatch } from '..';


export const RegisterPage = () => {
    const dispatch = useDispatch()

    const { form, handleChange } = useForm<IProfileForm>({ email: '', password: '', name: '' });

    const handleRegister = ({ name, email, password }: IFormData) => {
        dispatch(register({ name, email, password }));
    };

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