import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, PasswordRecoverPage,
  PasswordResetPage, ProfilePage, IngredientPage, NotFound404Page } from './pages';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { UnauthorizedRoute } from './components/unauthorized-route/unauthorized-route';

const App = () => {
  return (
      <Router>
        <Switch>
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
      </Router>
  );
}

export default App;