import React, { FC, useMemo} from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-ingredients-category.module.css';
import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';
import { IIngredientsState, IState, TIngredientType } from '../../utils/types';


export const BurgerIngredientsCategory : FC<{type: TIngredientType}>= ({type}) => {

  const { items, cats } = useSelector<IState, IIngredientsState>(state => state.ingredients);

  const cat = useMemo(() => cats.find(c => c.type === type), [cats, type]);
  if (!cat) {
    return null;
  }
  return (
    <div className={styles.main}>
        <p className={`text text_type_main-medium ${styles.textWrapper}`}  ref={cat.ref} >{cat.name}</p>
        {items.filter(ing => ing.type === type).map(ing => (
            <BurgerIngredientsCard key={ing._id} ingredient={ing}/>
        ))}
    </div>
  );
};

