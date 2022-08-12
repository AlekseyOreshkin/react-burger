import React from 'react';
import burgerConstructorListStyles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {SelectedIngredients, IngredientsData} from '../../utils/data'

class BurgerConstructorList extends React.Component {
  render() {
    const topData = IngredientsData.find(d => d._id === SelectedIngredients.top);
    const bottomData = IngredientsData.find(d => d._id === SelectedIngredients.bottom);
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
            {SelectedIngredients.middle.map((id, index) => {
                const data = IngredientsData.find(d => d._id === id);
                return (
                  data && 
                    <div className={burgerConstructorListStyles.ingredientWrapper} key={index}>
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
  }
}

export default BurgerConstructorList;