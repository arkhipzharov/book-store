import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Main } from './Main';
import { Cart } from './Cart';
import { Favorite } from './Favorite';
import { Login } from './Login';

export const Pages = () => {
  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/favorite">
          <Favorite />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Container>
  );
};
