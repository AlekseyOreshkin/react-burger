import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-home.module.css';
import { useDispatch, useSelector } from "react-redux";
import { patchUser } from "../../services/actions/authInfo";

export const ProfileHome = () => {
    const { name, email } = useSelector(state => state.authInfo.user);

    const initForm = useMemo(() => ({name, email, password: ''}), [name, email]);
    
    const [form, setValue] = useState(initForm);

    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setDisabled(form.name === initForm.name && form.email === initForm.email && form.password === initForm.password);
    }, [form, initForm])

    
    const onChange = useCallback( e => {
        e.persist();
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'password' && !initForm.password)
        {
            initForm.password = value;
        }
        setValue({ ...form, [name]: value });
    }, [form, setValue, initForm]);
    
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