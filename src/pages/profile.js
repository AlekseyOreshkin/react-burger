import React, { useCallback, useEffect }  from 'react';

import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header'
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { ProfileHome } from '../components/profile-home/profile-home';
import { ProfileOrders } from '../components/profile-orders/profile-orders';
import { Route } from '../utils/route';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../services/actions/authInfo';

export const ProfilePage = () => {
  const { success } = useSelector(state => state.authInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    if (!success) {
      history.replace({pathname: '/login'});
    }
  }, [success, history]);
  
  const handleLogout = useCallback(() => {
      dispatch(logout())
  }, [dispatch]);
    
    return (<div className='main-grid' >
        <AppHeader />
        <div className={styles.main} >
          <ProfileMenu onLogout={handleLogout}/>
          <Route path='/profile'><ProfileHome /></Route>
          <Route path='/profile/orders'><ProfileOrders /></Route>
        </div>
      </div>);
}