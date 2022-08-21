import React, { useState, useContext, useEffect, createRef }from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from '../burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsBox } from '../burger-ingredients-box/burger-ingredients-box';
import { IngredientsContext, IngredientCategoriesContext}  from '../../contexts/contexts';

const initialState = {tabs: new Set(), active: '', catRefs: []};

const BurgerIngredients = () => {

  const [ingregientsData, ] = useContext(IngredientsContext);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let newState = initialState;
    let first = '';
    ingregientsData.map(i => i.type).forEach(t => {
      if (!newState.tabs.has(t)) {
        if (newState.tabs.size === 0) {
          first = t;
        }
        newState.tabs.add(t);
      }
    });
    newState.tabs.forEach(tab => {
      newState.catRefs = [...newState.catRefs, {cat: tab, ref: createRef()}];
    });
    if (state.active.length > 0 && newState.types.has(state.active)) {
      newState.active = state.active;
    } else {
      newState.active = first;
    }
    setState(newState);
  // eslint-disable-next-line
  }, [ingregientsData]);

  return (
  <div  className={burgerIngredients.main}>
    <IngredientCategoriesContext.Provider value={[state, setState]} >
      <BurgerIngredientsTabs />
      <BurgerIngredientsBox />
    </IngredientCategoriesContext.Provider>
  </div>
  );
};


export default BurgerIngredients;