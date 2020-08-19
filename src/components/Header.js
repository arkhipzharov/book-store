import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <Container className="mb-3">
      <Navbar expand="lg" className="px-0">
        <div className="d-flex w-100 justify-content-between">
          <Navbar.Brand as={NavLink} to="/">
            Book Store
          </Navbar.Brand>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Nav className="ml-auto mr-4">
            <Nav.Link as={NavLink} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorite">
              Favorite
            </Nav.Link>
          </Nav>
          <div className="my-2 my-lg-0 d-flex align-items-center">
            <Button className="mr-2">Login</Button>
            <Button>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
