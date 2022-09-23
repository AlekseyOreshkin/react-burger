import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { UnauthorizedRoute } from '../unauthorized-route/unauthorized-route';

import {AppHeader} from '../app-header/app-header'
import { HomePage, LoginPage, RegisterPage, PasswordRecoverPage,
  PasswordResetPage, ProfilePage, IngredientPage, NotFound404Page } from '../../pages';

import { getIngredients } from '../../services/actions/ingredients';
import { ModalIngredient } from '../modal-ingredient/modal-ingredient';

const App = () => {
  const ingredients = useSelector(store => store.ingredients.items);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const background = location.state && location.state.background;

   useEffect(() => {
     if (!ingredients || ingredients.length === 0) {
       dispatch(getIngredients());
     }
   }, [ingredients, dispatch]);

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
          <Route path='/'  exact={true}>
            <HomePage />
          </Route>
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
        {background && <Route path="/ingredients/:id" children={<ModalIngredient />} />}
        </div>
    );
}

export default App;