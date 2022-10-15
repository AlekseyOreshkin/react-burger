import { useCallback, useContext } from 'react';
import styles from './burger-ingredients-tabs.module.css';
import { SET_ACTIVE_TAB } from '../../services/actions/ingredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryContext } from '../../hooks/category-context';
import { useDispatch, useSelector } from '../..';


export const BurgerIngredientsTabs = () => {

  const { activeTab, cats } = useSelector(state => state.ingredients);
  const categoryContext = useContext(CategoryContext);

  const dispatch = useDispatch();

  const onSetActive = useCallback((type: string) => {
    const cat = cats.find(c => c.type === type);
    if (cat) {
      categoryContext[cat.type].current?.scrollIntoView({ behavior: "smooth" });
      dispatch({ type: SET_ACTIVE_TAB, active: cat.type });
    }
  }, [dispatch, cats, categoryContext]);


  return (
    <div className={styles.main}>
      {cats.map(cat => (
        <Tab value={cat.type} key={cat.type} active={cat.type === activeTab} onClick={onSetActive} >
          {cat.name}
        </Tab>
      ))}
    </div>
  );
}

