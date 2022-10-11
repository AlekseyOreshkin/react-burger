import { useEffect } from 'react';
import { useDispatch } from '..';
import { FeedSummary } from '../components/feed-summary/feed-summary';
import { FeedList } from '../components/feed-list/feed-list';
import { openWsConnection, WS_CONNECTION_CLOSED } from '../services/actions/socket-middleware';
import styles from './feed.module.css';
import { WS_FEED_URL } from '../utils/constants';


export const FeedPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(openWsConnection(WS_FEED_URL));
        return () => {dispatch({type: WS_CONNECTION_CLOSED})};
    // eslint-disable-next-line 
    }, []);

    return (<>
        <h1 className={`text_type_main-medium ${styles.staticText}`}>Лента заказов</h1>
          <FeedList />
          <FeedSummary />
    </>);
}


