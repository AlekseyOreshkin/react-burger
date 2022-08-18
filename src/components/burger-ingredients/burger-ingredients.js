import React, { useState, useContext, useEffect }from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab';
import BurgerIngredientsBox from '../burger-ingredients-box/burger-ingredients-box';
import { IngredientsContext, IngredientCategoriesContext}  from '../../contexts/contexts';

const initialState = {types: new Set(), active: '', ingredientsListRef: null};

const BurgerIngredients = () => {

  const [ingregientsData, ] = useContext(IngredientsContext);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let newState = initialState;
    let first = '';
    ingregientsData.map(i => i.type).forEach(t => {
      if (!newState.types.has(t)) {
        if (newState.types.size === 0) {
          first = t;
        }
        newState.types.add(t);
      }
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
      <BurgerIngredientsTab />
      <BurgerIngredientsBox />
    </IngredientCategoriesContext.Provider>
  </div>
  );
};


export default BurgerIngredients;