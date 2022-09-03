import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd/dist/hooks';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { UPDATE_INGREDIENTS_ORDER } from '../../services/actions/constructor';

export const BurgerConstructorItem = ({data, index, onRemoveIngredient}) => {

  const items = useSelector(state => state.constructor.items);

    const dispatch = useDispatch();
    const ref = useRef(null);
    
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      const dragCard = items[dragIndex];
      const newCards = [...items]
      newCards.splice(dragIndex, 1)
      newCards.splice(hoverIndex, 0, dragCard)
      dispatch({type: UPDATE_INGREDIENTS_ORDER, items: [...newCards]}); 
    }, [items, dispatch]);
  
    const [, drop] = useDrop({
        accept: 'constructor_item',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId()
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          moveCard(dragIndex, hoverIndex);
          item.index = hoverIndex;
        }
      });
    
    const [{opacity}, drag] = useDrag({
        type: 'constructor_item',
        item: { index },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0 : 1
        })
      });
    
      
    drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();
    return (<div className={styles.main} style={{opacity}} ref={ref} onDrop={preventDefault}>
        <div className={styles.ingredientWrapper}>
          <div className={styles.dragIconWrapper} >
            <DragIcon />
          </div>
          <ConstructorElement
            text={data.name}
            thumbnail={data.image}
            price={data.price} 
            handleClose={()=> onRemoveIngredient(index)}/>
        </div>
      </div>);
};
BurgerConstructorItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRemoveIngredient: PropTypes.func.isRequired
};