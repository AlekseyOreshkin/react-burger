import React from 'react';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerIngredientsTab extends React.Component {
  render() {
    return (
        <div style={{display: 'flex'}}>
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