import { useCallback }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients-tabs.module.css';
import { SET_ACTIVE_TAB } from '../../services/actions/ingredients';
import { IIngredientsState, IState } from '../../utils/types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


export const BurgerIngredientsTabs = () => {
  
  const {activeTab, cats} = useSelector<IState, IIngredientsState>(state => state.ingredients);
  const dispatch = useDispatch();

  const onSetActive = useCallback( (type : string) => {
    const cat = cats.find(c => c.type === type);
    if (cat) {
      cat.ref.current?.scrollIntoView({ behavior: "smooth" });
      dispatch( {type: SET_ACTIVE_TAB, cat: type});
    }
  }, [dispatch, cats]);


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

