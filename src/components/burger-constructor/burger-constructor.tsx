import styles from './burger-constructor.module.css';
import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';
import { BurgerConstructorSubmit } from '../burger-constructor-submit/burger-constructor-submit';

export const BurgerConstructor = () => {
  return (
  <div className={styles.main}>
    <BurgerConstructorList />
    <BurgerConstructorSubmit />
  </div>
  );
};
