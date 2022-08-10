import React from 'react';
import burgerIngredientsBox from './burger-ingredients-box.module.css';
import BurgerIngredientsCategory from '../burger-ingredients-category/burger-ingredients-category';
import {IngredientsCategories, IngredientsData} from '../../utils/data'



class BurgerIngredientsBox extends React.Component {
  render() {
    return (
    <div  className={burgerIngredientsBox.main}>
        {IngredientsCategories.map((cat, index) => (
            <BurgerIngredientsCategory type={cat} key={index} > 
                {IngredientsData.filter(ingr => ingr.type === cat).map((ingr, index) => (<p key={index}>{ingr.name}</p>))}
            </BurgerIngredientsCategory>
        ))}
    </div>
    );
  }
}

export default BurgerIngredientsBox;