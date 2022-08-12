import React from 'react';
import burgerIngredientsTabStyles from './burger-ingredients-tab.module.css';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredientsTab extends React.Component {
  render() {
    return (
        <div className={burgerIngredientsTabStyles.main}>
            <Tab value="one" active={true} onClick={() => {}}>
              Булки
            </Tab>
            <Tab value="two" active={false} onClick={() => {}}>
              Соусы
            </Tab>
            <Tab value="three" active={false} onClick={() => {}}>
              Начинки
            </Tab>
        </div>
    );
  }
}

export default BurgerIngredientsTab;