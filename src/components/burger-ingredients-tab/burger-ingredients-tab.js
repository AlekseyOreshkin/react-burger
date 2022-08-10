import React from 'react';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerIngredientsTab extends React.Component {
  state = { current: "one" };
  setCurrent = (v) => {
    this.setState({current: v});
  }
  render() {
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={true} onClick={this.setCurrent}>
            Булки
            </Tab>
            <Tab value="two" active={this.state.current === 'two'} onClick={this.setCurrent}>
            Соусы
            </Tab>
            <Tab value="three" active={this.state.current === 'three'} onClick={this.setCurrent}>
            Начинки
            </Tab>
        </div>
    );
  }
}

export default BurgerIngredientsTab;