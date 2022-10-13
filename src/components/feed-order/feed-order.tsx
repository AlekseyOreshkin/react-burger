import { useSelector } from '../..';
import styles from './feed-order.module.css';
import { IFeedOrder } from '../../utils/types'
import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientIcon } from '../../ui/ingredient-icon/ingredient-icon';
import { useIngredientKey } from '../../hooks/use-ingredient-key';

interface IProps {
    order: IFeedOrder<string>;
}
const MAX_ITEMS_COUNT = 7;
export const FeedOrder = ({ order }: IProps) => {
    const ingredients = useSelector(store => store.ingredients.items)?.filter(i => order.ingredients.includes(i._id));
    const { handleUuid: uuid } = useIngredientKey();


    const { items, extra } = useMemo(() => {
        const count = ingredients.length;
        return (count > MAX_ITEMS_COUNT) ?
            { items: ingredients.slice(0, MAX_ITEMS_COUNT), extra: '+' + (count - MAX_ITEMS_COUNT).toString() }
            : { items: ingredients, extra: '' };
    }, [ingredients]);

    const date = useMemo(() => new Date(order.createdAt), [order.createdAt]);
    const price = useMemo(() => { return ingredients ? ingredients.map(i => Number(i.price)).reduce((acc, p) => acc += p) : 0 }, [ingredients]);
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <p className={`text text_type_digits-default`}>#{order.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}>{date.toLocaleString()}</p>
            </div>
            <p className="text text_type_main-default">{order.name}</p>
            <div className={styles.content}>
                <div className={styles.ingredients}>
                    {
                        items.map((i, idx) => (
                            <div className={styles.icon} style={{ zIndex: `${1000 - idx}` }} key={uuid(idx, i._id)}>
                                <IngredientIcon image={i.image} info={idx === items.length - 1 ? extra : ''} />
                            </div>
                        ))
                    }
                </div>
                <p className={`text text_type_main-medium ${styles.price}`}>{price}&nbsp;<CurrencyIcon type="primary" /></p>
            </div>
        </div>
    );
}


