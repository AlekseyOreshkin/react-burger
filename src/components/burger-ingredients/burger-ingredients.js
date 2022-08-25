import React, { useEffect }from 'react';
import { useDispatch } from 'react-redux';
import burgerIngredients from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from '../burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsBox } from '../burger-ingredients-box/burger-ingredients-box';
import { getIngredients } from '../../services/actions/ingredients';

const BurgerIngredients = () => {

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
  <div  className={burgerIngredients.main}>
      <BurgerIngredientsTabs />
      <BurgerIngredientsBox />
  </div>
  );
};


export default BurgerIngredients;