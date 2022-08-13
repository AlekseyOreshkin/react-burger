import React from 'react';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import {IngredientsCategories, IngredientsData} from '../../utils/data'
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';


const BurgerIngredientsBox = () => {
  return (
    <div  className={`${burgerIngredientsBox.main} scrollable`}>
        {IngredientsCategories.map((cat, index) => (
            <BurgerIngredientsCategory type={cat} key={index} > 
                {IngredientsData.filter(ingr => ingr.type === cat).map((ingr, index) => (
                    <BurgerIngredientsCard key={index} ingredient={ingr} />
                ))}
            </BurgerIngredientsCategory>
        ))}
    </div>
  );
}

export default BurgerIngredientsBox;