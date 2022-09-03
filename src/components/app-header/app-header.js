import React from 'react';
import styles from './app-header.module.css';
import logoPath from '../../images/logo.svg'
import AppHeaderButton from '../app-header-button/app-header-button';

const AppHeader = () => {
  return (
    <header className={styles.nav} style={{backgroundImage: `url(${logoPath})`}}>
      <AppHeaderButton icon='burger' text='Конструктор' active={true}/>
      <AppHeaderButton icon='list' text='Лента заказов' />
      <div className={styles.rightItems}>
        <AppHeaderButton icon='profile' text='Личный кабинет' />
      </div>
    </header>
  );
}

export default AppHeader;