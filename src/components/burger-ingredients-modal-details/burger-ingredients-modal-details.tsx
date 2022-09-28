import { useMemo, } from 'react';
import {v4 as uuidv4} from 'uuid';
import styles from './burger-ingredients-modal-details.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IIngredient, IState } from '../../utils/types';


const detailsAccessors = [
    { name: 'Калории,ккал', accsessor: 'calories'},
    { name: 'Белки, г', accsessor: 'proteins'},
    { name: 'Жиры, г', accsessor: 'fat'},
    { name: 'Углеводы, г', accsessor: 'carbohydrates'}
];

export const BurgerIngredientsModalDetails = () => {

    const { id } = useParams<{id: string}>();
    const ingredients = useSelector<IState, IIngredient[]>(store => store.ingredients.items);

   
    const ingredient = useMemo(() => {
        return ingredients.find(o => o._id === id)
    }, [id, ingredients]);
    if (!ingredient) {
        return null;
    }
    return (
        <div className={styles.main} >
           <img src={ingredient.image_large} alt={ingredient.name} />
            <p className='text text_type_main-medium'>{ingredient.name}</p>
            <div className={styles.details}>
                {detailsAccessors.map( o => (
                    <div key={uuidv4()} className={styles.info}>
                        <p className={`text text_type_main-small`}>{o.name}</p>
                        {/* @ts-ignore */}
                        <p className={`text text_type_main-medium`}>{ingredient[o.accsessor]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

