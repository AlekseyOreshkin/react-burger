import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks';
import burgerConstructorListStyles from './burger-constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {addIngredient, moveIngredients} from '../../services/actions/constructor';
import { isBun } from '../../utils/validation';
import {BurgerConstructorItem} from '../burger-constructor-item/burger-constructor-item';


const BurgerConstructorList = () => {

  const ingredients = useSelector(state => state.ingredients.items);
  const {bun_id, ids} = useSelector(state => ({bun_id: state.constructor.bun, ids: state.constructor.items}));
  const dispatch = useDispatch();
  
  const [, dropNewRef] = useDrop({
    accept: 'new_ingredient',
    drop(item) {
      onDropNewIngredientHandler(item);
    }
  });

  const onDropNewIngredientHandler = (item) => {
    dispatch(addIngredient(item._id, isBun(item))); 
  };
  
  const onRemoveIngredient = (index) => {
    let arr = [...ids];
    arr.splice(index, 1);
    dispatch(moveIngredients(arr));
  }


  const topData = ingredients.find(i => i._id === bun_id);
  const bottomData = topData;
  const selectedIngredients = ids?.map(id => ingredients.find(o => o._id === id));
  
  return (
    <div className={burgerConstructorListStyles.main} ref={dropNewRef} >
        {topData && <div className={burgerConstructorListStyles.topBun}>
          <ConstructorElement
            type='top'
            isLocked='true'
            text={`${topData.name} (верх)`}
            thumbnail={topData.image}
            price={topData.price}/>
        </div>}
        {ids && <div className={`${burgerConstructorListStyles.ingredients} scrollable`}>
            {selectedIngredients.map((data, index) => <BurgerConstructorItem key={index} data={data} index={index} onRemoveIngredient={onRemoveIngredient}/>)}
        </div>}
        {bottomData && <div className={burgerConstructorListStyles.bottomBun}>
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