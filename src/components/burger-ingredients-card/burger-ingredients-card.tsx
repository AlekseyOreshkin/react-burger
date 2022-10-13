import { useDrag } from 'react-dnd/dist/hooks';
import styles from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { IIngredient } from '../../utils/types';
import { Counter } from '../../ui/counter/counter';

interface IProps {
  ingredient: IIngredient;
  count?: number;
}

export const BurgerIngredientsCard : FC<IProps> = ({ ingredient, count }) => {
  const location = useLocation();
  const [{ showCount, opacity }, dragRef] = useDrag({
    type: 'new_ingredient',
    item: {...ingredient},
    collect: monitor => ({
      showCount: !monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  
  return (
    <Link  className={styles.main}  style={{opacity}}
      to={{pathname: `/ingredients/${ingredient._id}`, state: {background: location} }} > 
        {showCount && <Counter count={count} />}
        <div ref={dragRef}>
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
        </div>
    </Link>
  );
};
