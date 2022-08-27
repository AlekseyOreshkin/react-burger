import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { showIngredientDetails } from '../../services/actions/ingredients';


const BurgerIngredientsCard = ({ ingredient }) => {

  const dispatch = useDispatch();

  const [{isDragging}, dragRef] = useDrag({
    type: 'new_ingredient',
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  
  return (
    !isDragging && (<div  className={burgerIngredientsCard.main} ref={dragRef}
      onClick={() => dispatch(showIngredientDetails(ingredient))}>
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
  ingredient: PropTypes.object.isRequired
  
};
export default BurgerIngredientsCard;