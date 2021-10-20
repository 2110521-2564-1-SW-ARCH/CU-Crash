import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";

const CustomNavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">CU-CRASH</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Review" id="basic-nav-dropdown">
              <NavDropdown.Item href="/reviews/subjects">
                Subjects
              </NavDropdown.Item>
              <NavDropdown.Item href="/reviews/instructors">
                Instructors
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
            <Button variant="primary" type="submit">
              Log out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default function PageContainer(props) {
  return (
    <>
      <CustomNavBar />
      <Container fluid="md">
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </>
  );
}
