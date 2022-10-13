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
            <div className={styles.firstRow}><p className='text text_type_digits-default'>#{order.number}</p></div>
            <div className={styles.nameRow}>
                <p className='text text_type_main-default'>{order.name}</p>
                {(order.status === 'done') && <p className={`text text_type_main-small ${styles.done}`}>Выполнен</p>}
            </div>
            <div className={styles.itemsRow}>
                <p className='text text_type_main-default'>Состав:</p>
                <div className={styles.items}>
                  {groups.map(g =>(<div className={styles.ingredient} key={g.item._id}>
                    <IngredientIcon image={g.item.image}/>
                    <p className={`text text_type_main-default`}>{g.item.name}</p>
                    <div className={styles.itemPrice}>
                        <p className={`text text_type_digits-default`}>{g.count}x{g.item.price}&nbsp;</p>
                        <CurrencyIcon type='primary'/>
                    </div>
                  </div>))
                }</div>
            </div>
            <div className={styles.lastRow}>
                <p className={`text text_type_main-small ${styles.time}`}>{date.toLocaleString()}</p>
                <div className={styles.itemPrice}>
                    <p className={`text text_type_digits-default`}>{price}&nbsp;</p>
                    <CurrencyIcon type='primary'/></div>
                </div>
            </div>
    );
}