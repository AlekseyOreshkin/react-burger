import styles from './feed-item.module.css'
import { OrderDetails } from "../components/order-details/order-details";
import { openWsConnection, WS_CONNECTION_CLOSED } from '../services/actions/socket-middleware';
import { useDispatch, useSelector } from '..';
import { useEffect } from 'react';
import { WS_FEED_URL, WS_ORDERS_URL } from '../utils/constants';

interface IProps {
    orders?: boolean;
}
export const FeedItemPage = ({orders = false}: IProps) => {
    const ws = useSelector(state => state.feed);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!ws.wsConnected || !ws.data.success) {
            if (orders) {
                dispatch(openWsConnection(WS_ORDERS_URL, true));
            } else {
                dispatch(openWsConnection(WS_FEED_URL));
            }

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