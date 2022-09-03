import React  from 'react';

import styles from './not-found-404.module.css';
import AppHeader from '../components/app-header/app-header'


export const NotFound404Page = () => {
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className='form-area'>
            <p className="text text_type_main-large">Страница не найдена</p>
            </div>
        </div>

      </div>);
}