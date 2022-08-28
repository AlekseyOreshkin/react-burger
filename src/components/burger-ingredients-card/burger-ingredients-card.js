import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { showIngredientDetails } from '../../services/actions/ingredientDetails';


const BurgerIngredientsCard = ({ ingredient }) => {
  const showDetails = useSelector(state => state.ingredientDetails.show);
  
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: 'new_ingredient',
    item: {...ingredient},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  
  return (
    (<div  className={burgerIngredientsCard.main} ref={dragRef} style={{opacity}}
      onClick={() => !showDetails && dispatch(showIngredientDetails(ingredient._id))}> 
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