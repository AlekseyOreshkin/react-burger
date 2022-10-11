import { useEffect }from 'react';

import { Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { UnauthorizedRoute } from '../unauthorized-route/unauthorized-route';

import {AppHeader} from '../app-header/app-header'
import { HomePage, LoginPage, RegisterPage, PasswordRecoverPage,
  PasswordResetPage, ProfilePage, IngredientPage, NotFound404Page } from '../../pages';

import { getIngredients } from '../../services/actions/ingredients';
import { ILocationState } from '../../utils/types';
import { useDispatch, useSelector } from '../..';
import { FeedPage } from '../../pages/feed';
import { FeedItemPage } from '../../pages/feed-item';
import { ModalFeedItem } from '../modal-feed-item/modal-feed-item';
import { ModalIngredient } from '../modal-ingredient/modal-ingredient';

const App = () => {
  const ingredients = useSelector(store => store.ingredients.items);
  const dispatch = useDispatch();
  const location = useLocation<ILocationState>();
  
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
          <Route path='/feed' exact={true}>
            <FeedPage />
          </Route>
          <ProtectedRoute path='/feed/:id' exact={true}>
            <FeedItemPage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <FeedItemPage orders={true}/>
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
        {background && <Route path="/ingredients/:id" children={<ModalIngredient />} />}
        {background && <Route path="/feed/:id" children={<ModalFeedItem />} />}
        {background && <Route path="/profile/orders/:id" children={<ModalFeedItem />} />}
      </div>
    );
}

export default App;