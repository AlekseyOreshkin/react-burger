import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-home.module.css';
import { patchUser } from "../../services/actions/authInfo";
import { useForm } from "../../hooks/use-form";
import { IProfileForm } from "../../utils/types";
import { useDispatch, useSelector } from "../..";

export const ProfileHome = () => {
    const { request, user: {name, email} } = useSelector(state => state.authInfo);

    const initForm = useMemo<IProfileForm>(() => ({name, email, password: ''}), [name, email]);
    
    const {form, handleChange, setValues} = useForm(initForm);

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!initForm.password) {
            initForm.password = form.password;
        }
        setDisabled(!request && form.name === initForm.name && form.email === initForm.email && form.password === initForm.password);
    }, [form, initForm, request])

    
    const onSubmit = useCallback((e) => {
        e.persist();
        e.preventDefault();
        dispatch(patchUser(form));
    }, [form, dispatch]);
    
    const onReset = useCallback((e) => {
        e.persist();
        e.preventDefault();
        setValues({...initForm});
    }, [initForm, setValues]);
  
    return (
        <form className={styles.main} onSubmit={onSubmit}>
            <Input type='text' name='name' value={form.name} placeholder='Имя' onChange={handleChange} />
            <EmailInput  name='email' value={form.email} onChange={handleChange} />
            <PasswordInput name='password' value={form.password} onChange={handleChange} />
            {!disabled && (<div> <Button type='primary' size='medium' disabled={disabled}>Сохранить</Button> 
            <Button type='secondary' size='medium' disabled={disabled} onClick={onReset}>Отмена</Button></div>)}
        </form>
    );
}