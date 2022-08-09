import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';


class BurgerIngredients extends React.Component {
  render() {
    return (
    <div  className={`${burgerIngredients.main} mt-5 mr-5`}>
        <p className="text text_type_main-large">Соберите бургер</p>
    </div>
    );
  }
}

export default BurgerIngredients;