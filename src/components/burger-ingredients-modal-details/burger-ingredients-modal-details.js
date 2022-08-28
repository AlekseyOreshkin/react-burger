import React, { useMemo } from 'react';
import {v4 as uuidv4} from 'uuid';
import burgerIngredientsModalDetailsStyles from './burger-ingredients-modal-details.module.css'
import { useSelector } from 'react-redux';

const detailsAccessors = [
    { name: 'Калории,ккал', accsessor: 'calories'},
    { name: 'Белки, г', accsessor: 'proteins'},
    { name: 'Жиры, г', accsessor: 'fat'},
    { name: 'Углеводы, г', accsessor: 'carbohydrates'}
]

export const BurgerIngredientsModalDetails = () => {

    const id = useSelector(store => store.ingredientDetails.id);
    const ingredients = useSelector(store => store.ingredients.items);

    const ingredient = useMemo(() => ingredients.find(o => o._id === id), [id, ingredients]);

    return (
        <div className={burgerIngredientsModalDetailsStyles.main} >
           <img src={ingredient.image_large} alt={ingredient.name} />
            <p className='text text_type_main-medium'>{ingredient.name}</p>
            <div className={burgerIngredientsModalDetailsStyles.details}>
                {detailsAccessors.map( (o, i) => (
                    <div key={uuidv4()} className={burgerIngredientsModalDetailsStyles.info}>
                        <p className={`text text_type_main-small`}>{o.name}</p>
                        <p className={`text text_type_main-medium`}>{ingredient[o.accsessor]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

