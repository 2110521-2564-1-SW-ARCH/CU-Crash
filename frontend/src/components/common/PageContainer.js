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
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/home">CU-CRASH</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Reviews" id="basic-nav-dropdown">
              <NavDropdown.Item href="/reviews/subject">
                Subject
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/reviews/instructor">
                Instructor
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/supplementaries">Supplementaries</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
          <Button variant="primary" type="submit">
            Log out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default function PageContainer(props) {
  return (
    <>
      <CustomNavBar />
      <Container style={{ color: "darkblue" }} className="mt-4" fluid="md">
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </>
  );
}
