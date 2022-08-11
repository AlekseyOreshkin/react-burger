import React from 'react';
import burgerConstructorListStyles from './burger-constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {SelectedIngredients, IngredientsData} from '../../utils/data'

class BurgerConstructorList extends React.Component {
  render() {
    return (
    <div className={`${burgerConstructorListStyles.main} scrollable`}>
        {SelectedIngredients.map((ingredient, index) => {
            let data = IngredientsData.find(d => d._id === ingredient._id);
            return (
              data && 
                <div style={{marginBottom: '10px'}}>
                  <ConstructorElement key={index}
                    type={ingredient.type}
                    isLocked={ingredient.isLocked}
                    text={data.name}
                    thumbnail={data.image}
                    price={data.price}/>
                </div>
              )
          })
        }
    </div>
    );
  }
}

export default BurgerConstructorList;