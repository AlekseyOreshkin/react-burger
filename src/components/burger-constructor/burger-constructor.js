import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import BurgerConstructorSubmit from '../burger-constructor-submit/burger-constructor-submit';

const BurgerConstructor = ({data}) => {
  return (
  <div className={burgerConstructorStyles.main}>
    <BurgerConstructorList data={data}/>
    <BurgerConstructorSubmit />
  </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerConstructor;