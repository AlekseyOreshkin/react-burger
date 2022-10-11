import { useEffect }from 'react';

import { Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { UnauthorizedRoute } from '../unauthorized-route/unauthorized-route';

import {AppHeader} from '../app-header/app-header'
import { HomePage, LoginPage, RegisterPage, PasswordRecoverPage,
  PasswordResetPage, ProfilePage, IngredientPage, NotFound404Page } from '../../pages';

import { getIngredients } from '../../services/actions/ingredients';
import { ModalIngredient } from '../modal-ingredient/modal-ingredient';
import { ILocationState } from '../../utils/types';
import { useDispatch, useSelector } from '../..';
import { FeedPage } from '../../pages/feed';
import { FeedItemPage } from '../../pages/feed-item';
import { OrdersPage } from '../../pages/orders';
import { OrdersItemPage } from '../../pages/orders-item';
import { ModalFeedItem } from '../modal-feed-item/modal-feed-item';
import { ModalOrdersItem } from '../modal-orders-item/modal-orders-item';

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
          <ProtectedRoute path='/profile' >
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders' exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id' exact={true}>
            <OrdersItemPage />
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
        {background && <Route path="/profile/orders/:id" children={<ModalOrdersItem />} />}
      </div>
    );
}

export default App;