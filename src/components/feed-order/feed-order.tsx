import { useSelector } from '../..';
import styles from './feed-order.module.css';
import {IFeedOrder} from '../../utils/types'
import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientIcon } from '../../ui/ingredient-icon/ingredient-icon';

interface IProps {
    order: IFeedOrder<string>;
}
export const FeedOrder = ({ order } : IProps) => {
    const ingredients = useSelector(store => store.ingredients.items)?.filter(i => order.ingredients.includes(i._id));
    const date = useMemo(() => new Date(order.createdAt), [order.createdAt]);
    const price = useMemo(() => ingredients ? ingredients.map(i => Number(i.price)).reduce((acc, p) => acc += p) : 0, [ingredients]);
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <p className={`text text_type_digits-default`}>#{order.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}>{date.toUTCString()}</p>
            </div>
            <p className="text text_type_main-default">{order.name}</p>
            <div className={styles.content}>
                <div className={styles.ingredients}>
                    {
                        ingredients.map((i, idx) => (
                            <div className={styles.icon} style={{zIndex: `${1000 - idx}`}} key={`${i}_${idx}`}>
                                <IngredientIcon image={i.image} />
                            </div>
                        ))
                    }
                </div>
                <p className={`text text_type_main-medium ${styles.price}`}>{price}&nbsp;<CurrencyIcon type="primary" /></p>
            </div>
        </div>
    );
}


