import React from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';


const BurgerIngredientsCard = ({ ingredient }) => {
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: 'new_ingredient',
    item: {...ingredient},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  
  return (
    <Link  className={styles.main} ref={dragRef} style={{opacity}}
      to={{pathname: `/ingredients/${ingredient._id}`, state: {background: location} }} > 
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.priceWrapper}>
          <p className={`text_type_digits-default ${styles.textWrapper}`}>
              {ingredient.price}
          </p>
          <div className={styles.logoWrapper}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <p className="text text_type_main-small">
            {ingredient.name}
        </p>
    </Link>
  );
};

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.object.isRequired
  
};
export default BurgerIngredientsCard;