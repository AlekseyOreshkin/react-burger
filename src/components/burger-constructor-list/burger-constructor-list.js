import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorListStyles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorList = ({data}) => {
  if (!data || data.length === 0) {
    return (<p>Конструктор пуст</p>);
  }
  const IngredientsData = data;
  const topData = IngredientsData.find(d => d.type === 'bun');
  const bottomData = topData;
  const SelectedIngredients = IngredientsData.filter(d => d.type !== 'bun');
  
  return (
    <div className={burgerConstructorListStyles.main}>
        <div className={burgerConstructorListStyles.topBun}>
          <ConstructorElement
            type='top'
            isLocked='true'
            text={`${topData.name} (верх)`}
            thumbnail={topData.image}
            price={topData.price}/>
        </div>
        <div className={`${burgerConstructorListStyles.ingredients} scrollable`}>
            {SelectedIngredients.map((data, index) => {
                return (
                  data && 
                    <div className={burgerConstructorListStyles.ingredientWrapper} key={data._id}>
                      <div className={burgerConstructorListStyles.dragIconWrapper}>
                        <DragIcon />
                      </div>
                      <ConstructorElement
                        text={data.name}
                        thumbnail={data.image}
                        price={data.price}/>
                    </div>
                  )
              })
            }
        </div>
        <div className={burgerConstructorListStyles.bottomBun}>
          <ConstructorElement
            type='bottom'
            isLocked='true'
            text={`${bottomData.name} (низ)`}
            thumbnail={bottomData.image}
            price={bottomData.price}/>
        </div>
    </div>
  );
};


BurgerConstructorList.propTypes = {
  data: PropTypes.array
};

export default BurgerConstructorList;