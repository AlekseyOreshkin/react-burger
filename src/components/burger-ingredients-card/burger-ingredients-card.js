import React, { useCallback } from 'react';
import { useDispatch  } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';
import PropTypes from 'prop-types';
import burgerIngredientsCard from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SHOW_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetails';
import { useHistory } from 'react-router-dom';


const BurgerIngredientsCard = ({ ingredient }) => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [{ opacity }, dragRef] = useDrag({
    type: 'new_ingredient',
    item: {...ingredient},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const onShowIngredientDetails = useCallback((e) => {
    e.persist();
    e.stopPropagation();
    if (e.ctrlKey) {
      history.push({ pathname: `/ingredients/${ingredient._id}`, state: {from: '/ingredients'}})
    } else {
      dispatch({type: SHOW_INGREDIENT_DETAILS, id: ingredient._id})
    }
  }, [dispatch, ingredient, history]);
  
  return (
    (<div  className={burgerIngredientsCard.main} ref={dragRef} style={{opacity}}
      onClick={onShowIngredientDetails}> 
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