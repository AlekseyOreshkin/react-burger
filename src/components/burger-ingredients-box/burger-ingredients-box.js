import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import { IngredientsCategories }  from '../../utils/data'
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';


const BurgerIngredientsBox = ({ data }) => {
  const IngredientsData = data;
  return (
    <div  className={`${burgerIngredientsBox.main} scrollable`}>
        {IngredientsCategories.map((cat, index) => (
            <BurgerIngredientsCategory type={cat} key={index} > 
                {IngredientsData.filter(ing => ing.type === cat).map((ing, index) => (
                    <BurgerIngredientsCard key={index} ingredient={ing} />
                ))}
            </BurgerIngredientsCategory>
        ))}
    </div>
  );
}

BurgerIngredientsBox.propTypes = {
  data: PropTypes.any // PropTypes.arrayof(PropTypes.object.isRequired).isRequired
};

export default BurgerIngredientsBox;