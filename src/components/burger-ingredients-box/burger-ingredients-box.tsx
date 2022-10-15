import React, { useCallback, createRef, SyntheticEvent, useContext } from 'react';
import styles from './burger-ingredients-box.module.css';
import { BurgerIngredientsCategory } from '../burger-ingredients-category/burger-ingredients-category';
import { SET_ACTIVE_TAB } from '../../services/actions/ingredients';
import { CategoryContext } from '../../hooks/category-context';
import { useDispatch, useSelector } from '../..';


export const BurgerIngredientsBox = () => {

  const cats = useSelector(state => state.ingredients.cats);
  const categoryContext = useContext(CategoryContext);

  const dispatch = useDispatch();

  const positionRef = createRef<HTMLDivElement>();

  const onScroll = useCallback((e: SyntheticEvent) => {
    e.persist();
    e.preventDefault();
    const getYPos = (ref: React.RefObject<HTMLDivElement>) => ref.current ? Math.abs(Math.floor(ref.current.getBoundingClientRect().top)) : 0;
    const parentTop = positionRef.current ? positionRef.current.getBoundingClientRect().top + 2 : 0;
    const closestCat = { type: cats[0].type, pos: getYPos(categoryContext[cats[0].type]) };
    cats.forEach(cat => {
      if (closestCat.type === cat.type) {
        return;
      }
      const top = Math.abs(parentTop - getYPos(categoryContext[cat.type]));
      if (closestCat.pos > top) {
        closestCat.type = cat.type;
        closestCat.pos = top;
      }
    });
    dispatch({ type: SET_ACTIVE_TAB, active: closestCat.type });
  }, [cats, positionRef, dispatch, categoryContext]);

  return (
    <div className={`${styles.main} scrollable`} onScroll={onScroll} ref={positionRef}>
      {cats.map(cat => (<BurgerIngredientsCategory
        key={cat.type} type={cat.type} />))}
    </div>
  );
}

