import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, PasswordRecoverPage,
  PasswordResetPage, ProfilePage, IngredientPage, NotFound404Page } from './pages';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <HomePage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/register' exact={true}>
            <RegisterPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <PasswordRecoverPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <PasswordResetPage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
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