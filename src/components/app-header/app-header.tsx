import { FC } from 'react';
import styles from './app-header.module.css';
import { AppHeaderButton } from '../app-header-button/app-header-button';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const ROOT = '/';
const FEED = '/feed';
const LK = '/profile';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.nav} >
      <div className={styles.leftItems}>
        <AppHeaderButton path={ROOT} icon='burger' text='Конструктор' />
        <AppHeaderButton path={FEED} icon='list' text='Лента заказов' />
      </div>
      <Link className={styles.homeLink} to={{ pathname: '/', state: { from: pathname } }}><Logo/></Link>
      <div className={styles.rightItems}>
        <AppHeaderButton path={LK} icon='profile' text='Личный кабинет' />
      </div>
    </header>
  );
}
