import React, { useCallback }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients-tabs.module.css';
import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { setActiveTab } from '../../services/actions/ingredients';


export const BurgerIngredientsTabs = () => {
  
  const {activeTab, cats} = useSelector(state => ({activeTab: state.ingredients.activeTab, cats: state.ingredients.cats}));
  const dispatch = useDispatch();

  const onSetActive = useCallback( (type) => {
    console.log(type);
    cats.find(c => c.type === type).ref.current.scrollIntoView({ behavior: "smooth" });
    dispatch(setActiveTab(type));
  }, [dispatch, cats]);


  return (
      <div className={styles.main}>
        {cats.map(cat => (
          <Tab value={cat.type} key={cat.type} active={cat.type === activeTab} onClick={onSetActive} className={styles.tab}>
            {cat.name}
        </Tab>
        ))}
      </div>
  );
}

