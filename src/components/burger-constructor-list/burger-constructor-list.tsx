import { FC, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_PRICE, CHANGE_INGREDIENTS} from '../../services/actions/constructor';
import {BurgerConstructorItem} from '../burger-constructor-item/burger-constructor-item';
import { IIngredient, IState, IConstructorState } from '../../utils/types';

export const isBun = (ingredient : IIngredient) : boolean =>  ingredient.type === 'bun';

export const BurgerConstructorList : FC = () => {

  const ingredients = useSelector<IState, IIngredient[]>(state => state.ingredients.items);
  const {bun : bun_id, items : ids} = useSelector<IState, IConstructorState>(state => state.constructor);
  
  const dispatch = useDispatch();
  
  interface IDropResult {
    isHover: boolean;
  }
 
  const [{ isHover }, dropNewRef] = useDrop<IIngredient, any, IDropResult>({
    accept: 'new_ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      onDropNewIngredientHandler(item);
    }
  });

  useEffect(() => {
    const arr = ids ? [...ids] : [];
    if (bun_id) {
      arr.splice(0, 0, bun_id, bun_id);
    }
    const price = arr.map(id => (id ? ingredients.find(o => o._id === id)?.price : 0)).reduce((acc, price) => (acc ?? 0) + (price ?? 0), 0);
    dispatch({type: SET_PRICE, price});
  }, [bun_id, ids, ingredients, dispatch]);

  const onDropNewIngredientHandler = useCallback((item: IIngredient) => {
    const items = ids ? [...ids] : [];
    let bun = bun_id;
    if (isBun(item)) {
      bun = item._id;
    } else {
      items.splice(-1, 0, item._id);
    }
    dispatch({type: CHANGE_INGREDIENTS, bun: bun, items}); 
  }, [dispatch, ids, bun_id]);
  
  const onRemoveIngredient = useCallback((index : number) => {
    const arr = [...ids];
    arr.splice(index, 1);
    dispatch({type: CHANGE_INGREDIENTS, bun: bun_id, items: arr});
  }, [ids, bun_id, dispatch]);
  

  const topData = useMemo(() => ingredients.find(i => i._id === bun_id), [ingredients, bun_id]);
  const bottomData = useMemo( () => topData, [topData]);
  const selectedIngredients = useMemo(() => ids?.map(id => ingredients.find(o => o._id === id)), [ids, ingredients]);
  
  return (
    <div className={`${styles.main} ${isHover ? styles.onHover : ''}`} ref={dropNewRef} >
        {topData && <div className={styles.topBun}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${topData.name} (верх)`}
            thumbnail={topData.image}
            price={topData.price}/>
        </div>}
        {ids && <div className={`${styles.ingredients} scrollable`} style={{margin: bun_id ? '0' : 'auto 0'}}>
            {selectedIngredients.map((data : IIngredient | undefined, index : number) => {
              return (data && <BurgerConstructorItem
                key={`${data._id}@${index}`} 
                data={data} index={index} 
                onRemoveIngredient={onRemoveIngredient}/>);})
              }
            </div>}
        {bottomData && <div className={styles.bottomBun}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bottomData.name} (низ)`}
            thumbnail={bottomData.image}
            price={bottomData.price}/>
        </div>}
    </div>
  );
};
