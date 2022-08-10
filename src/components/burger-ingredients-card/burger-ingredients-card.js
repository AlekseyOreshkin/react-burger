import React from 'react';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredientsCard extends React.Component {
  render() {
    return (
    <div  className={burgerIngredientsCard.main}>
        <img src={this.props.ingredient.image} alt={this.props.ingredient.name} />
        <p className="text text_type_digits-default">
            {this.props.ingredient.price}
            <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-small">
            {this.props.ingredient.name}
        </p>
    </div>
    );
  }
}

export default BurgerIngredientsCard;