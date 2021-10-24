import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from 'react-router-dom'
import CustomNavbar from "./CustomNavbar";

export default function PageContainer(props) {
  const location = useLocation();
  const showNavbar = ['/', '/login', '/register'].every((path) => location.pathname !== path)

  return (
    <>
      {showNavbar && <CustomNavbar />}
      <Container style={{ color: "darkblue" }} fluid="md" className="pt-16">
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </>
  );
}
