import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_PRICE, CHANGE_INGREDIENTS } from '../../services/actions/constructor';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import { IIngredient } from '../../utils/types';
import { useDispatch, useSelector } from '../..';
import { v4 as uuid } from 'uuid';

export const isBun = (ingredient: IIngredient): boolean => ingredient.type === 'bun';

export const BurgerConstructorList: FC = () => {

  const ingredients = useSelector(state => state.ingredients.items);
  const { bun: bun_id, items } = useSelector(state => state.constructor);


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
    const arr = items ? [...items] : [];
    if (bun_id) {
      const bun_item = { id: bun_id, key: '' };
      arr.splice(0, 0, bun_item, bun_item);
    }
    const price = arr.map(item => (item ? ingredients.find(o => o._id === item.id)?.price : 0)).reduce((acc, price) => (acc ?? 0) + (price ?? 0), 0);
    dispatch({ type: SET_PRICE, price });
  }, [bun_id, items, ingredients, dispatch]);

  const onDropNewIngredientHandler = useCallback((item: IIngredient) => {
    const arr = items ? [...items] : [];
    let bun = bun_id;
    if (isBun(item)) {
      bun = item._id;
    } else {
      arr.splice(-1, 0, { id: item._id, key: uuid() });
    }
    dispatch({ type: CHANGE_INGREDIENTS, bun: bun, items: arr });
  }, [dispatch, items, bun_id]);

  const onRemoveIngredient = useCallback((index: number) => {
    const arr = [...items];
    arr.splice(index, 1);
    dispatch({ type: CHANGE_INGREDIENTS, bun: bun_id, items: arr });
  }, [items, bun_id, dispatch]);


  const topData = useMemo(() => ingredients.find(i => i._id === bun_id), [ingredients, bun_id]);
  const bottomData = useMemo(() => topData, [topData]);
  const selectedIngredients = useMemo(() => items?.map(item => {
    const obj = ingredients.find(o => o._id === item.id);
    if (obj) {
      return { ...obj, key: item.key };
    }
    return undefined;
  }).filter(o => o !== undefined), [items, ingredients]);

  return (
    <div data-testid='drop-target' className={`${styles.main} ${isHover ? styles.onHover : ''}`} ref={dropNewRef} >
      {topData && <div className={styles.topBun}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${topData.name} (верх)`}
          thumbnail={topData.image}
          price={topData.price} />
      </div>}
      {items && <div className={`${styles.ingredients} scrollable`} style={{ margin: bun_id ? '0' : 'auto 0' }}>
        {selectedIngredients?.map((item, index) => {
          return (item && <BurgerConstructorItem
            key={item.key}
            data={item} index={index}
            onRemoveIngredient={onRemoveIngredient} />);
        })
        }
      </div>}
      {bottomData && <div className={styles.bottomBun}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${bottomData.name} (низ)`}
          thumbnail={bottomData.image}
          price={bottomData.price} />
      </div>}
    </div>
  );
};
