import React, { useCallback, useContext } from 'react';
import burgerIngredientsTabStyles from './burger-ingredients-tab.module.css';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { mapIngredientCategoryId, mapIngredientCategoryName } from '../../utils/map-ingredient-category-name';
import { IngredientCategoriesContext } from '../../contexts/contexts';


const BurgerIngredientsTab = () => {
  
  const [state, setState] = useContext(IngredientCategoriesContext);

  const setActive = useCallback((type) => {
    document.getElementById(mapIngredientCategoryId(type))?.scrollIntoView({ behavior: "smooth" });
    setState({...state, active: type});
  }, [state, setState]);

  return (
      <div className={burgerIngredientsTabStyles.main}>
        {Array.from(state.types).map(t => (
          <Tab value={t} key={t} active={t === state.active} onClick={(value) => {setActive(value)}} className={burgerIngredientsTabStyles.tab}>
            {mapIngredientCategoryName(t)}
        </Tab>
        ))}
      </div>
  );
}


export default BurgerIngredientsTab;