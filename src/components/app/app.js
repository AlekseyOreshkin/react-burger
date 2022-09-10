import React, { useEffect }from 'react';
import { useDispatch } from 'react-redux';

import { Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { UnauthorizedRoute } from '../unauthorized-route/unauthorized-route';

import AppHeader from '../app-header/app-header'
import { HomePage, LoginPage, RegisterPage, PasswordRecoverPage,
  PasswordResetPage, ProfilePage, IngredientPage, NotFound404Page } from '../../pages';

import { getIngredients } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
 // eslint-disable-next-line
  }, []);
  const location = useLocation();
  
  const background = location.state && location.state.background;

  return (
      <div className='main-grid'>
        <AppHeader />
        <Switch location={background || location}>
          <UnauthorizedRoute path='/login' exact={true}>
              <LoginPage />
          </UnauthorizedRoute>
          <UnauthorizedRoute path='/register' exact={true}>
            <RegisterPage />
          </UnauthorizedRoute>
          <UnauthorizedRoute path='/forgot-password' exact={true}>
            <PasswordRecoverPage />
          </UnauthorizedRoute>
          <UnauthorizedRoute path='/reset-password' exact={true}>
            <PasswordResetPage />
          </UnauthorizedRoute>
          <ProtectedRoute path='/'  exact={true}>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile' >
            <ProfilePage />
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientPage />
          </Route>
          <Route >
            <NotFound404Page />
          </Route>
        </Switch>
        </div>
    );
}

export default App;