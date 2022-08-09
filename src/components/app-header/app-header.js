import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends React.Component {
  render() {
    return (
      <nav className={headerStyles.nav}>
        <div className='{headerStyles.leftBox}'>
          <Button type="secondary" size="medium"><BurgerIcon type="primary" /><span className="text text_type_main-default">Конструктор</span></Button>
          <Button type="secondary" size="medium"><ListIcon type="primary" /><span className="text text_type_main-default">Лента заказов</span></Button>
        </div>
        <div className='{headerStyles.navBox}'>
          <Logo className={headerStyles.logo} />
        </div>
        <div className='{headerStyles.rightBox}'>
          <Button type="secondary" size="medium"><ProfileIcon type="primary" /><span className="text text_type_main-default">Личный кабинет</span></Button>
        </div>
      </nav>
    );
  }
}

export default AppHeader;