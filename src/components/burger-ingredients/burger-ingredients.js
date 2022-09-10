import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from '../burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsBox } from '../burger-ingredients-box/burger-ingredients-box';

const BurgerIngredients = () => {

  
  
  return (
  <div  className={burgerIngredients.main}>
      <BurgerIngredientsTabs />
      <BurgerIngredientsBox />
  </div>
  );
};


export default BurgerIngredients;