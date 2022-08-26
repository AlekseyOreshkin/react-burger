import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd/dist/hooks';
import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { moveIngredients } from '../../services/actions/constructor';

export const BurgerConstructorItem = ({data, index, onRemoveIngredient}) => {

    const items = useSelector(state => state.constructor.items);

    const dispatch = useDispatch();
    
    const [, dropRef] = useDrop({
        accept: 'constructor_item',
        drop(item) {
          onDrop(item);
        }
      });
    
    const [{isDragging}, dragRef] = useDrag({
        type: 'constructor_item',
        item: { index },
        collect: monitor => ({
          isDragging: monitor.isDragging()
        })
      });
    
    
    const onDrop = (from) => {
      if (index === from.index) {
        return;
      }

      const arr = [...items];
      const target_id = arr.splice(from.index, 1)[0];
      arr.splice(index > from.index ? index - 1: index, 0, target_id);
      console.log(items, arr);
      dispatch(moveIngredients(arr)); 
    };
    

    return (!isDragging && <div className={burgerConstructorItemStyles.main} ref={dropRef} >
        <div ref={dragRef} className={burgerConstructorItemStyles.ingredientWrapper}>
          <div className={burgerConstructorItemStyles.dragIconWrapper} >
            <DragIcon />
          </div>
          <ConstructorElement
            text={data.name}
            thumbnail={data.image}
            price={data.price} 
            handleClose={()=> onRemoveIngredient(index)}/>
        </div>
      </div>);
}