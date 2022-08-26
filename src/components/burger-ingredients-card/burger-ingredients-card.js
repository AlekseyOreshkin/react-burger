import React from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerIngredientsCard = ({ ingredient, showDetails }) => {
  
  const [{isDragging}, dragRef] = useDrag({
    type: 'new_ingredient',
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  
  return (
    !isDragging && (<div  className={burgerIngredientsCard.main} onClick={() => {showDetails(ingredient)}} ref={dragRef}>
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
    </div>)
  );
};

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
  showDetails: PropTypes.func.isRequired
};
export default BurgerIngredientsCard;