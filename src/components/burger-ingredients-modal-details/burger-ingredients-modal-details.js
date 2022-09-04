import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import styles from './burger-ingredients-modal-details.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

const detailsAccessors = [
    { name: 'Калории,ккал', accsessor: 'calories'},
    { name: 'Белки, г', accsessor: 'proteins'},
    { name: 'Жиры, г', accsessor: 'fat'},
    { name: 'Углеводы, г', accsessor: 'carbohydrates'}
]

export const BurgerIngredientsModalDetails = ({pid}) => {

    const id = useSelector(store => store.ingredientDetails.id);
    const ingredients = useSelector(store => store.ingredients.items);
    const dispatch = useDispatch();

    const ingredient = useMemo(() => {
        if (pid) {
            return ingredients.find(o => o._id === pid)    
        }
        return ingredients.find(o => o._id === id)
    }, [id, pid, ingredients]);
    if (!ingredient) {
        dispatch(getIngredients());
        return null;
    }

    return (
        <div className={styles.main} >
           <img src={ingredient.image_large} alt={ingredient.name} />
            <p className='text text_type_main-medium'>{ingredient.name}</p>
            <div className={styles.details}>
                {detailsAccessors.map( (o, i) => (
                    <div key={uuidv4()} className={styles.info}>
                        <p className={`text text_type_main-small`}>{o.name}</p>
                        <p className={`text text_type_main-medium`}>{ingredient[o.accsessor]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

BurgerIngredientsModalDetails.propTypes = {
    pid: PropTypes.string,
  };
