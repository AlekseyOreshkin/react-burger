import React, { useCallback }  from 'react';

import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { ProfileHome } from '../components/profile-home/profile-home';
import { ProfileOrders } from '../components/profile-orders/profile-orders';
import { Route } from '../utils/route';

import { useDispatch } from "react-redux";
import { logout } from '../services/actions/authInfo';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  
  const handleLogout = useCallback(() => {
      dispatch(logout())
  }, [dispatch]);
    
    return (
        <div className={styles.main} >
          <ProfileMenu onLogout={handleLogout}/>
          <Route path='/profile'><ProfileHome /></Route>
          <Route path='/profile/orders'><ProfileOrders /></Route>
        </div>
      );
}