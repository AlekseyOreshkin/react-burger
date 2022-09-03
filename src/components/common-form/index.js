import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React  from 'react';

import styles from './common-form.module.css';


export const CommonForm = ({children, headerText, submitText}) => {
    return (<div className={styles.main} >
        <h1 className={`text text_type_main-medium ${styles.header}`}>{headerText}</h1>
        {children}
        <div className={styles.buttonWrapper}>
        <Button type='primary' size='large' >
            {submitText}
        </Button>
        </div>
      </div>);
}