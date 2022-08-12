import React from 'react';
import headerStyles from './app-header.module.css';
import logoPath from '../../images/logo.svg'
import AppHeaderButton from '../app-header-button/app-header-button';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.nav} style={{backgroundImage: `url(${logoPath})`}}>
        <AppHeaderButton icon='burger'>Конструктор</AppHeaderButton>
        <AppHeaderButton icon='list'>Лента заказов</AppHeaderButton>
        <div className={headerStyles.rightItems}>
          <AppHeaderButton icon='profile'>Личный кабинет</AppHeaderButton>
        </div>
      </header>
    );
  }
}

export default AppHeader;