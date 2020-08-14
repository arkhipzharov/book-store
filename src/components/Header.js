import { Button, Navbar, Nav, Container } from 'react-bootstrap';

export const Header = () => {
  return (
    <Container>
      <Navbar expand="lg" className="mb-4 px-0">
        <div className="d-flex w-100 justify-content-between">
          <Navbar.Brand>Book Store</Navbar.Brand>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Nav className="ml-auto mr-4">
            <Nav.Link>Favorite</Nav.Link>
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
