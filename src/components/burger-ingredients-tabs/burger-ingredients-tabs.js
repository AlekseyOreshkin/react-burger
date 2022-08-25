import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsTabsStyles from './burger-ingredients-tabs.module.css';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { setActiveTab } from '../../services/actions/ingredients';


export const BurgerIngredientsTabs = () => {
  
  const {activeTab, cats} = useSelector(state => ({activeTab: state.ingredients.activeTab, cats: state.ingredients.cats}));
  const dispatch = useDispatch();
  
  const setActive = (type) => {
    dispatch(setActiveTab(type));
    console.log(type);
  };

  return (
      <div className={burgerIngredientsTabsStyles.main}>
        {cats.map(cat => (
          <Tab value={cat.type} key={cat.type} active={cat.type === activeTab} onClick={(value) => {setActive(value)}} className={burgerIngredientsTabsStyles.tab}>
            {cat.name}
        </Tab>
        ))}
      </div>
  );
}

