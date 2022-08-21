import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';
import {mapIngredientCategoryName} from '../../utils/map-ingredient-category-name';

const BurgerIngredientsCategory = ({type, children, catRef}) => {

  return (
    <div className={burgerIngredientsCategory.main} ref={catRef}>
        <p className={`text text_type_main-medium ${burgerIngredientsCategory.textWrapper}`}>
            {mapIngredientCategoryName(type)}
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