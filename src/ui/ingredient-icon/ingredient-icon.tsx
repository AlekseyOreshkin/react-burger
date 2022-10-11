import styles from './ingredient-icon.module.css'

interface IProps {
    image: string;
}
export const IngredientIcon = ({image} : IProps) => {
    return (<div className={styles.ingredientBg}>
        <div className={styles.ingredient} style={{backgroundImage: `url(${image})`}}/>
    </div>);
}