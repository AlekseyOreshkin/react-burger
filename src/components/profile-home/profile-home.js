import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-home.module.css';
import { useDispatch, useSelector } from "react-redux";
import { patchUser } from "../../services/actions/authInfo";

export const ProfileHome = () => {
    const { request, user: {name, email} } = useSelector(state => state.authInfo);

    const initForm = useMemo(() => ({name, email, password: ''}), [name, email]);
    
    const [form, setValue] = useState(initForm);

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!initForm.password) {
            initForm.password = form.password;
        }
        setDisabled(!request && form.name === initForm.name && form.email === initForm.email && form.password === initForm.password);
    }, [form, initForm, request])

    
    const onChange = useCallback( e => {
        e.persist();
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setValue({ ...form, [name]: value });
    }, [form, setValue]);
    
    const onSubmit = useCallback((e) => {
        e.persist();
        e.preventDefault();
        dispatch(patchUser(form));
    }, [form, dispatch]);
    
    const onReset = useCallback((e) => {
        e.persist();
        e.preventDefault();
        setValue({...initForm});
    }, [initForm]);
  
    return (
        <form className={styles.main} onSubmit={onSubmit}>
            <Input type='text' name='name' value={form.name} placeholder='Имя' onChange={onChange} />
            <EmailInput  name='email' value={form.email} onChange={onChange} />
            <PasswordInput name='password' value={form.password} onChange={onChange} />
            {!disabled && (<div> <Button type='primary' size='medium' disabled={disabled}>Сохранить</Button> 
            <Button type='secondary' size='medium' disabled={disabled} onClick={onReset}>Отмена</Button></div>)}
        </form>
    );
}