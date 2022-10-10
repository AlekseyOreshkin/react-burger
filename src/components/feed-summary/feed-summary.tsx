import { useMemo } from 'react';
import { useSelector } from '../..';
import { TFeedOrderStatusDone } from '../../utils/types';
import styles from './feed-summary.module.css';


export const FeedSummary = () => {
    const state = useSelector(state => state.feed);

    const [today, total, waiting, done] = useMemo( () => {
        if (!state.wsConnected || ! state.data.success) {
            return [0, 0, undefined, undefined];
        }
        const done : string[] = [];
        const waiting : string[] = [];
        state.data.orders.forEach(o => {
            if (o.status === TFeedOrderStatusDone) {
                done.push(o.number);
            } else {
                waiting.push(o.number);
            }
        });
        return [state.data.totalToday, state.data.total, waiting, done];
    }, [state]);
    return (
        <div className={styles.main}>
            <div className={styles.firstRow}>
                <div className={styles.leftColumn}>
                    <p className={`text text_type_main-default ${styles.firstHeader}`}>Готовы:</p>
                    <div className={styles.leftNums}>{ 
                        done?.map(s => (<p key={s} className={`text text_type_digits-default`}>{s}</p>))
                    }</div>
                </div>
                <div className={styles.rightColumn}>
                    <p className={`text text_type_main-default ${styles.firstHeader}`}>В работе:</p>
                    <div className={styles.nums}>{ 
                        waiting?.map(s => (<p key={s} className={`text text_type_digits-default`}>{s}</p>))
                    }</div>
                </div>
            </div>
            <div className={styles.row}>
                <p className={`text text_type_main-default  ${styles.header}`}>Выполнено за все время:</p>
                <p className={`text text_type_digits-large`}>{total}</p>
            </div>
            <div className={styles.row}>
                <p className={`text text_type_main-default ${styles.header}`}>Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large`}>{today}</p>
            </div>
        </div>
    );
}


