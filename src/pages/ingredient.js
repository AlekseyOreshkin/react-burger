import React  from 'react';

import styles from './ingredient.module.css';
import AppHeader from '../components/app-header/app-header'
import { BurgerIngredientsModalDetails } from '../components/burger-ingredients-modal-details/burger-ingredients-modal-details';
import { useParams } from 'react-router-dom';


export const IngredientPage = () => {
  const {id} = useParams();
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
            <div className={`form-area ${styles.box}`}>
              <h1 className={`text text_type_main-large ${styles.header}`}>Детали ингредиента</h1>
              <BurgerIngredientsModalDetails pid={id} />
            </div>
        </div>
      </div>);
}