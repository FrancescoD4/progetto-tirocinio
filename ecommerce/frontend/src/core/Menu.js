import {React, Fragment } from 'react'
//withRouter serve per accedere alla storia dei props
import { withRouter } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import './Menu.css';

const Menu = ({history}) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {isAuthenticated() && isAuthenticated().user.role ===0 &&(
            <Nav.Link href="/user/dashboard">Dashboard</Nav.Link>
          )}
          {isAuthenticated() && isAuthenticated().user.role ===1 &&(
            <Nav.Link href="/admin/dashboard">Admin Dashboard</Nav.Link>
          )}
          <Nav.Link href="/shop">Shop</Nav.Link>
          <Nav.Link href="/cart">Carrello{" "}<sup><small className="cart-badge">{itemTotal()}</small></sup></Nav.Link>
        </Nav>
        <Nav>
          {!isAuthenticated() && (
            <Fragment >
              <Nav.Link href="/signup">Registrati</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
            </Fragment>
          )}
          {isAuthenticated() && (
              <Nav.Link onClick={() => signout( () => {
                  history.push("/")
              })}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default withRouter(Menu);