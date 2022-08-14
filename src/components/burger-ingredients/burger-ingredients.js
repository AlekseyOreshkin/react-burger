import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredients from './burger-ingredients.module.css';
import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab'
import BurgerIngredientsBox from '../burger-ingredients-box/burger-ingredients-box'


const BurgerIngredients = ({ data }) => {
  return (
  <div  className={burgerIngredients.main}>
      <BurgerIngredientsTab />
      <BurgerIngredientsBox data={data}/>
  </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array
};

export default BurgerIngredients;