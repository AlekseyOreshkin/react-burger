import { useEffect } from 'react';
import { useDispatch } from '../..';
import { openWsConnection, WS_CONNECTION_CLOSED } from '../../services/actions/socket-middleware';
import { WS_ORDERS_URL } from '../../utils/constants';
import { FeedList } from '../feed-list/feed-list';
import styles from './profile-orders.module.css';

export const ProfileOrders = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(openWsConnection(WS_ORDERS_URL, true));
        return () => { dispatch({ type: WS_CONNECTION_CLOSED }) };
        // eslint-disable-next-line 
    }, []);

    return (<div className={styles.main}>
        <FeedList />
    </div>
    );
}