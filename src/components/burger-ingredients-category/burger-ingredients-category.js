import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';


const BurgerIngredientsCategory = ({type, children}) => {
  const getName = type => {
    switch(type) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинки';
      default:
        return 'Соусы';
    }

  }

  return (
    <div  className={burgerIngredientsCategory.main}>
        <p className={`text text_type_main-medium ${burgerIngredientsCategory.textWrapper}`}>
            {getName(type)}
        </p>
        {children}
    </div>
  );
};

BurgerIngredientsCategory.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
};

export default BurgerIngredientsCategory;