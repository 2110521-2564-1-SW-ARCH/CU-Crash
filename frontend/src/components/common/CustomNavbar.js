import { Container, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function CustomNavbar() {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const username = JSON.parse(sessionStorage.getItem("user-info")).username;
  const history = useHistory();

  const onLogout = () => {
    let isLogout = true;
    console.log("call changePassword");
    // try {
    //   const res = await axios({});
    //   console.log(res.data);
    // } catch (e) {
    //   console.log(e)
    // }
    if (isLogout) {
      console.log("logout successfully");
      sessionStorage.clear();
      history.replace("/login");
      history.go(0);
    } else {
      console.log("logout fail");
    }
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
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
          <Navbar.Text>Signed in as: {username}</Navbar.Text>
          <Button
            variant="primary"
            type="submit"
            className="mx-4"
            onClick={onLogout}
          >
            Log out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
