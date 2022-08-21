import React, { useCallback, useContext } from 'react';
import burgerIngredientsTabsStyles from './burger-ingredients-tabs.module.css';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { mapIngredientCategoryName } from '../../utils/map-ingredient-category-name';
import { IngredientCategoriesContext } from '../../contexts/contexts';


const BurgerIngredientsTabs = () => {
  
  const [state, setState] = useContext(IngredientCategoriesContext);

  const setActive = useCallback((type, ref) => {
    setState({...state, active: type});
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [state, setState]);

  return (
      <div className={burgerIngredientsTabsStyles.main}>
        {Array.from(state.tabs).map(t => (
          <Tab value={t} key={t} active={t === state.active} onClick={(value) => {setActive(value, state.catRefs.find(o => o.cat === t).ref)}} className={burgerIngredientsTabsStyles.tab}>
            {mapIngredientCategoryName(t)}
        </Tab>
        ))}
      </div>
  );
}


export {
  BurgerIngredientsTabs
};