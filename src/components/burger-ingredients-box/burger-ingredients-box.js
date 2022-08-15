import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import { IngredientsCategories }  from '../../utils/data'
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';


const BurgerIngredientsBox = ({ data }) => {
  return (
    <div  className={`${burgerIngredientsBox.main} scrollable`}>
        {IngredientsCategories.map((cat, index) => (
            <BurgerIngredientsCategory type={cat} key={index} > 
                {data.filter(ing => ing.type === cat).map((ing, index) => (
                    <BurgerIngredientsCard key={ing._id} ingredient={ing} />
                ))}
            </BurgerIngredientsCategory>
        ))}
    </div>
  );
}

BurgerIngredientsBox.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerIngredientsBox;