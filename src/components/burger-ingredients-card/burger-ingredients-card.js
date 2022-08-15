import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerIngredientsCard = ({ ingredient, ingredientRef, showDetails }) => {
  
  const popupDetails = () => {
    ingredientRef.current = ingredient;
    showDetails();
  }
  
  return (<>
    <div  className={burgerIngredientsCard.main} onClick={popupDetails}>
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={burgerIngredientsCard.priceWrapper}>
          <p className={`text_type_digits-default ${burgerIngredientsCard.textWrapper}`}>
              {ingredient.price}
          </p>
          <div className={burgerIngredientsCard.logoWrapper}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <p className="text text_type_main-small">
            {ingredient.name}
        </p>
    </div>
  </>);
};

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
  ingredientRef: PropTypes.object.isRequired,
  showDetails: PropTypes.func.isRequired
};
export default BurgerIngredientsCard;