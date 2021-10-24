import {
  Button,
  Form,
  ButtonGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants";
import axios from "axios";

export default function Register() {
  let history = useHistory();
  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async () => {
    const config = {
      headers: {
        apikey: "apikey",
      },
    };
    const res = await axios.post(
      `${API_URL}/user/create`,
      registerData,
      config
    );
    if (res?.status == 200) {
      console.log('Register Succesfully');
      history.push("/login");
      history.go(0);
    } else {
      console.log('Register Fail');
    }
  };

  return (
    <>
      <Form>
        <Container>
          <Row className="justify-content-md-center mt-3">
            <Col md="auto">
              <Form.Group className="mb-3 md-5">
                <h1 className="font-weight-bold">Register</h1>
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row className="justify-content-md-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row className="justify-content-md-center">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </Form.Group>
          </Row>
        </Container>
      </Form>
    <Row className="justify-content-md-center mt-4">
      <Button
        variant="primary"
        type="submit"
        size="lg"
        onClick={handleSubmit}
      >
        Register
      </Button>
      </Row>
    </>
  );
}
