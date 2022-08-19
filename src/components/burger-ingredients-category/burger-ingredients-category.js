import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCategory from './burger-ingredients-category.module.css';
import {mapIngredientCategoryId, mapIngredientCategoryName} from '../../utils/map-ingredient-category-name';

const BurgerIngredientsCategory = ({type, children}) => {

  return (
    <div id={mapIngredientCategoryId(type)} className={burgerIngredientsCategory.main}>
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