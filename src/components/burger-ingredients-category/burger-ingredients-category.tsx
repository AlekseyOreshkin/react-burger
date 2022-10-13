import { FC, useContext, useMemo} from 'react';
import styles from './burger-ingredients-category.module.css';
import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';
import { TIngredientType } from '../../utils/types';
import { CategoryContext } from '../../hooks/category-context';
import { useSelector } from '../..';


export const BurgerIngredientsCategory : FC<{type: TIngredientType}>= ({type}) => {

  const { items, cats } = useSelector(state => state.ingredients);
  const counter = useSelector(state => state.constructor.counter) ?? {};

  const categoryContext = useContext(CategoryContext);

  const cat = useMemo(() => cats.find(c => c.type === type), [cats, type]);
  if (!cat) {
    return null;
  }
  return (
    <div className={styles.main}>
        <p className={`text text_type_main-medium ${styles.textWrapper}`}  ref={categoryContext[cat.type]} >{cat.name}</p>
        {items.filter(ing => ing.type === type).map(ing => (
            <BurgerIngredientsCard key={ing._id} ingredient={ing} count={counter[ing._id]}/>
        ))}
    </div>
  );
};

