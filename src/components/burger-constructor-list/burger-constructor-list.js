import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks';
import burgerConstructorListStyles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {addIngredient, removeIngredient} from '../../services/actions/constructor';
import { isBun } from '../../utils/validation';


const BurgerConstructorList = () => {

  const ingredients = useSelector(state => state.ingredients.items);
  const {bun_id, ids} = useSelector(state => ({bun_id: state.constructor.bun, ids: state.constructor.items}));
  const dispatch = useDispatch();
  
  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    }
  });


  const onDropHandler = (item) => {
    dispatch(addIngredient(item._id, isBun(item))); 
  };

  const onRemoveIngredient = (index) => {
    let items = [...ids];
    delete items[index];
    dispatch(removeIngredient(items.filter(i => i)));
  }

  const topData = ingredients.find(i => i._id === bun_id);
  const bottomData = topData;
  const selectedIngredients = ids?.map(id => ingredients.find(o => o._id === id));
  
  return (
    <div className={burgerConstructorListStyles.main} ref={dropRef} >
        {topData && <div className={burgerConstructorListStyles.topBun}>
          <ConstructorElement
            type='top'
            isLocked='true'
            text={`${topData.name} (верх)`}
            thumbnail={topData.image}
            price={topData.price}/>
        </div>}
        {ids && <div className={`${burgerConstructorListStyles.ingredients} scrollable`}>
            {selectedIngredients.map((data, index) => {
                return (
                  <div className={burgerConstructorListStyles.ingredientWrapper} key={index}>
                    <div className={burgerConstructorListStyles.dragIconWrapper}>
                      <DragIcon />
                    </div>
                    <ConstructorElement
                      text={data.name}
                      thumbnail={data.image}
                      price={data.price} 
                      handleClose={()=> onRemoveIngredient(index)}/>
                  </div>
                )
              })
            }
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