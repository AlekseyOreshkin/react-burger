import { FC } from 'react';
import styles from './app-header.module.css';
import logoPath from '../../images/logo.svg'
import {AppHeaderButton} from '../app-header-button/app-header-button';

const ROOT = '/';
const LK = '/profile';

export const AppHeader : FC = () => {
  return (
    <header className={styles.nav} style={{backgroundImage: `url(${logoPath})`}}>
      <AppHeaderButton path={ROOT} icon='burger' text='Конструктор' />
      <AppHeaderButton icon='list' text='Лента заказов' />
      <div className={styles.rightItems}>
        <AppHeaderButton path={LK} icon='profile' text='Личный кабинет' />
      </div>
    </header>
  );
}
