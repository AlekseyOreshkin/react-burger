import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../..';
import { FeedOrder } from '../feed-order/feed-order';
import styles from './feed-list.module.css';

export const FeedList = () => {
    const feed = useSelector(state => state.feed);
    const location = useLocation();

    if (!feed.data.success) {
        return null;
    }
    return (<div className={`${styles.main} scrollable`}>
        {feed.data.orders.map(order => 
            <Link className={styles.link} key={order._id} 
                to={{pathname: `${location.pathname}/${order._id}`, state: {background: location} }} > 
                <FeedOrder order={order} />
            </Link>)}
        </div>);
}


