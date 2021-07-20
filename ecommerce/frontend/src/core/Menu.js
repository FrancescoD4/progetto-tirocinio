// import react from 'react'
//withRouter serve per accedere alla storia dei props
import {withRouter} from 'react-router-dom'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

const Menu = () => (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="/signup">Signup</Nav.Link>
      <Nav.Link href="/signin">SignIn</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
)

export default withRouter(Menu);