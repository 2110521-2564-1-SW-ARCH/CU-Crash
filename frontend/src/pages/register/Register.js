import {
  Button,
  Form,
  ButtonGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

require('dotenv').config();

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name + " " + email + " " + password);
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/user/create`,
      data: {
        email: email,
        name: name,
        password: password,
      },
      headers: {
        apikey: "apikey",
      },
      responseType: "json",
    });
    history.push("/login");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row className="justify-content-md-center mt-3">
          <Col md="auto">
            <Form.Group className="mb-3 md-5" controlId="formBasicEmail">
              <h1 class="font-weight-bold">Register</h1>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="justify-content-md-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="justify-content-md-center">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="justify-content-md-center mt-3">
          <Col md="auto">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Button
                variant="primary"
                type="submit"
                size="lg"
              // href="/login"
              >
                Register
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
