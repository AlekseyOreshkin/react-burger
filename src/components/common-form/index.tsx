import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode, SyntheticEvent } from 'react';
import styles from './common-form.module.css';


export const CommonForm : FC<{
    children: ReactNode,
    headerText: string,
    submitText: string,
    onSubmit: (e : SyntheticEvent) => void}> = (
        {children, headerText, submitText, onSubmit}) => {
    return (
        <form className={styles.main} onSubmit={onSubmit}>
            <h1 className={`text text_type_main-medium ${styles.header}`}>{headerText}</h1>
            {children}
            <div className={styles.buttonWrapper}>
                <Button type='primary' size='large'>{submitText}</Button>
            </div>
        </form>
    );
};
