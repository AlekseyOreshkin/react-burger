import React from 'react';
import headerStyles from './app-header.module.css';
import logoPath from '../../images/logo.svg'
import { Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends React.Component {
  render() {
    return (
      <div className={headerStyles.nav} style={{backgroundImage: `url(${logoPath})`}}>
        <Button type="secondary" size="medium" ><BurgerIcon type="primary" /><span className="text text_type_main-default">Конструктор</span></Button>
        <Button type="secondary" size="medium" ><ListIcon type="primary" /><span className="text text_type_main-default">Лента заказов</span></Button>
        <div className={headerStyles.rightItems}>
          <Button type="secondary" size="medium" ><ProfileIcon type="primary" /><span className="text text_type_main-default">Личный кабинет</span></Button>
        </div>
      </div>
    );
  }
}

export default AppHeader;