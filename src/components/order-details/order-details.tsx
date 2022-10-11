import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector } from '../..';
import { IngredientIcon } from '../../ui/ingredient-icon/ingredient-icon';
import { IIngredient } from '../../utils/types';
import styles from './order-details.module.css';

type TIngredientGroup = {item : IIngredient; count : number};
const  group = (ingredients : IIngredient[] ) : TIngredientGroup[] => {
    const acc : TIngredientGroup[] = [];
    ingredients.forEach(i => {
        let grp = acc.find(g => g.item._id === i._id);
        if (!grp) {
            grp = {item : i, count : 0};
            acc.push(grp);
        }
        grp.count++;
        if (i.type === 'bun') {
            grp.count++;
        }
    });
    return acc;
} 
export const OrderDetails = () => {
    const { id } = useParams<{id: string}>();
    const order = useSelector(state => state.feed.data.orders).find(o => o._id === id);
    const ingredients = useSelector(store => store.ingredients.items)
        .filter(i => order && order.ingredients.find(oi => oi === i._id)) || [];
    if (!order) {
        return null;
    }
    const groups = group(ingredients);
    const price = groups.map(g => g.item.price * g.count).reduce((acc, n) => acc += n);
    const date = new Date(order.createdAt);
    return (
        <div className={styles.main}>
            <div className={styles.firstRow}><p>#{order.number}</p></div>
            <div className={styles.row}><p>{order.name}</p></div>
            <div className={styles.row}><p>Состав:</p>{
                groups.map(g =>(<div className={styles.ingredient}>
                    <IngredientIcon image={g.item.image}/>
                    <p className={``}>{g.item.name}</p>
                    <p className={``}>{g.count}x{g.item.price} <CurrencyIcon type='primary'/></p>
                    </div>))
            }</div>
            <div className={styles.row}><p>{date.toUTCString()}</p><p>{price} <CurrencyIcon type='primary'/></p></div>
        </div>
    );
}