import { FeedDetails } from '../components/feed-details/feed-details';
import { FeedList } from '../components/feed-list/feed-list';
import styles from './feed.module.css';


export const FeedPage = () => {
    return (<>
        <h1 className={`text_type_main-medium ${styles.staticText}`}>Лента заказов</h1>
          <FeedList />
          <FeedDetails />
    </>);
}


