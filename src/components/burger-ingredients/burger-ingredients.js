import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab'
import BurgerIngredientsBox from '../burger-ingredients-box/burger-ingredients-box'


class BurgerIngredients extends React.Component {
  render() {
    return (
    <div  className={burgerIngredients.main}>
        <BurgerIngredientsTab />
        <BurgerIngredientsBox />
    </div>
    );
  }
}

export default BurgerIngredients;