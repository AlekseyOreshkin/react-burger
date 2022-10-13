import { FC } from 'react';
import styles from './ingredient-icon.module.css'

interface IProps {
    image: string;
    info?: string;
}
export const IngredientIcon : FC<IProps> = ({image, info}) => {
    return (<div className={styles.ingredientBg}>
        <div className={styles.ingredient} style={{backgroundImage: `url(${image})`}}>
            <p className='text text_type_main-default'>{info}</p>
        </div>
    </div>);
}