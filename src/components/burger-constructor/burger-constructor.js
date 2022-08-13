import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import BurgerConstructorSubmit from '../burger-constructor-submit/burger-constructor-submit';

const BurgerConstructor = () => {
  return (
  <div className={burgerConstructorStyles.main}>
    <BurgerConstructorList />
    <BurgerConstructorSubmit />
  </div>
  );
}


export default BurgerConstructor;