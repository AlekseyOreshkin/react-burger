import React from 'react';
import headerStyles from './app-header.module.css';
import logoPath from '../../images/logo.svg'
import AppHeaderButton from '../app-header-button/app-header-button';

const AppHeader = () => {
  return (
    <header className={headerStyles.nav} style={{backgroundImage: `url(${logoPath})`}}>
      <AppHeaderButton icon='burger' text='Конструктор' />
      <AppHeaderButton icon='list' text='Лента заказов' />
      <div className={headerStyles.rightItems}>
        <AppHeaderButton icon='profile' text='Личный кабинет' />
      </div>
    </header>
  );
}

export default AppHeader;