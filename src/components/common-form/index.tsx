import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode } from 'react';
import styles from './common-form.module.css';

export interface IFormData {
    [key: string] : string;
}

export const CommonForm : FC<{
    children: ReactNode,
    headerText: string,
    submitText: string,
    onSubmit: (data : IFormData) => void}> = (
        {children, headerText, submitText, onSubmit}) => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.persist();
        e.preventDefault();
        const target = e.target as (typeof e.target & HTMLInputElement[]);
        const obj : IFormData = {};
        for (let ctrl of target) {
            if (ctrl?.localName === "input")
            {
                obj[ctrl.name] = ctrl.value;
            }
        }
        onSubmit(obj);
    }
    return (
        <form className={styles.main} onSubmit={handleSubmit}>
            <h1 className={`text text_type_main-medium ${styles.header}`}>{headerText}</h1>
            {children}
            <div className={styles.buttonWrapper}>
                <Button type='primary' size='large'>{submitText}</Button>
            </div>
        </form>
    );
};
