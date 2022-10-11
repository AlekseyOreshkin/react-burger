import styles from './feed-item.module.css'
import { OrderDetails } from "../components/order-details/order-details";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/socket-middleware';
import { useDispatch, useSelector } from '..';
import { useEffect } from 'react';

export const FeedItemPage = () => {
    const ws = useSelector(state => state.feed);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!ws.wsConnected || !ws.data.success) {
            dispatch({type : WS_CONNECTION_START});
        }
        return () => {dispatch({type: WS_CONNECTION_CLOSED})};
    // eslint-disable-next-line 
    }, []);

    return ( <div className={styles.main} > 
        <div className={`form-area ${styles.box}`}>
            <OrderDetails />
        </div>
    </div>);
};