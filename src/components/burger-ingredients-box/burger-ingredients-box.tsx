import React, { useCallback, createRef, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients-box.module.css';
import { BurgerIngredientsCategory } from '../burger-ingredients-category/burger-ingredients-category';
import { SET_ACTIVE_TAB } from '../../services/actions/ingredients';
import { IState, IIngredientCategory } from '../../utils/types';


export const BurgerIngredientsBox = () => {

  const cats = useSelector<IState, IIngredientCategory[]>(state => state.ingredients.cats);
  const dispatch = useDispatch();
  
  const positionRef = createRef<HTMLDivElement>();

  const onScroll = useCallback( (e : SyntheticEvent)  => {
    e.persist();
    e.preventDefault();
    const getYPos = (ref : React.RefObject<HTMLDivElement>) => ref.current ? Math.abs(Math.floor(ref.current.getBoundingClientRect().top)) : 0;
    const parentTop = positionRef.current ? positionRef.current.getBoundingClientRect().top + 2 : 0;
    const closestCat = {type: cats[0].type, pos: getYPos(cats[0].ref)};
    cats.forEach(cat => {
      if (closestCat.type === cat.type) {
          return;
      }
      const top = Math.abs(parentTop - getYPos(cat.ref));
      if (closestCat.pos > top)
      {
        closestCat.type = cat.type;
        closestCat.pos = top;
      }
    });
    dispatch({type: SET_ACTIVE_TAB, cat: closestCat.type});
  },[cats, positionRef, dispatch]);

  return (
    <div  className={`${styles.main} scrollable`} onScroll={onScroll} ref={positionRef}>
        {cats.map(cat => (<BurgerIngredientsCategory 
          key={cat.type} type={cat.type}/>))}
    </div>
  );
}

