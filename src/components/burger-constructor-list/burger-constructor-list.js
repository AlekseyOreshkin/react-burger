import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks';
import { v4 as uuidv4 } from 'uuid';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setPrice, changeIngredients} from '../../services/actions/constructor';
import { isBun } from '../../utils/validation';
import {BurgerConstructorItem} from '../burger-constructor-item/burger-constructor-item';


const BurgerConstructorList = () => {

  const ingredients = useSelector(state => state.ingredients.items);
  const {bun_id, ids} = useSelector(state => ({bun_id: state.constructor.bun, ids: state.constructor.items}));
  const dispatch = useDispatch();
  
  const [{ isHover }, dropNewRef] = useDrop({
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
    const price = arr.map(id => (id ? Number(ingredients.find(o => o._id === id)?.price) : 0)).reduce((acc, price) => acc + price, 0);
    dispatch(setPrice(price))
  }, [bun_id, ids, ingredients, dispatch]);

  const onDropNewIngredientHandler = (item) => {
    const items = ids ? [...ids] : [];
    let bun = bun_id;
    if (isBun(item)) {
      bun = item._id;
    } else {
      items.splice(-1, 0, item._id);
    }
    dispatch(changeIngredients(bun, items)); 
  };
  
  const onRemoveIngredient = (index) => {
    let arr = [...ids];
    arr.splice(index, 1);
    dispatch(changeIngredients(bun_id, arr));
  }


  const topData = ingredients.find(i => i._id === bun_id);
  const bottomData = topData;
  const selectedIngredients = ids?.map(id => ingredients.find(o => o._id === id));
  
  return (
    <div className={`${styles.main} ${isHover ? styles.onHover : ''}`} ref={dropNewRef} >
        {topData && <div className={styles.topBun}>
          <ConstructorElement
            type='top'
            isLocked='true'
            text={`${topData.name} (верх)`}
            thumbnail={topData.image}
            price={topData.price}/>
        </div>}
        {ids && <div className={`${styles.ingredients} scrollable`} style={{margin: bun_id ? '0' : 'auto 0'}}>
            {selectedIngredients.map((data, index) => <BurgerConstructorItem key={uuidv4()} data={data} index={index} onRemoveIngredient={onRemoveIngredient}/>)}
        </div>}
        {bottomData && <div className={styles.bottomBun}>
          <ConstructorElement
            type='bottom'
            isLocked='true'
            text={`${bottomData.name} (низ)`}
            thumbnail={bottomData.image}
            price={bottomData.price}/>
        </div>}
    </div>
  );
};


export default BurgerConstructorList;