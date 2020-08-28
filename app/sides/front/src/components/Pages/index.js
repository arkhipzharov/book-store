import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PageNotFound } from './PageNotFound';
import { Main } from './Main';
import { Cart } from './Cart';
import { Favorite } from './Favorite';
import { Login } from './Login';
import { Signup } from './Signup';
import { User } from './User';
import { Product } from './Product';

export const Pages = () => {
  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/favorite" exact>
          <Favorite />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/user/:username" exact>
          <User />
        </Route>
        <Route path="/product/:id" exact>
          <Product />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Container>
  );
};
