import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredientsCard extends React.Component {
  render() {
    return (
    <div  className={burgerIngredientsCard.main}>
        <img src={this.props.ingredient.image} alt={this.props.ingredient.name} />
        <div className={burgerIngredientsCard.priceWrapper}>
          <p className={`text_type_digits-default ${burgerIngredientsCard.textWrapper}`}>
              {this.props.ingredient.price}
          </p>
          <div className={burgerIngredientsCard.logoWrapper}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <p className="text text_type_main-small">
            {this.props.ingredient.name}
        </p>
    </div>
    );
  }
}
BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
};
export default BurgerIngredientsCard;