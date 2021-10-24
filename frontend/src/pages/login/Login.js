import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./loginForm.css";

require('dotenv').config();

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email + " " + password);
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/user/login`,
      data:
        // username: email,
        // password: password,
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      responseType: "json",
    });
    console.log(res);
    console.log(res.data.access_token);
    // console.log(`setToken ${setToken}`)
    setToken(res.data.access_token);
    history.push("/home");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <Row className="justify-content-md-center mt-3">
            <Col md="auto">
              <h1 class="font-weight-bold">CU-CRASH</h1>
            </Col>
          </Row>

          <Row className="justify-content-md-center mt-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
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
              <Button variant="primary" size="lg" type="submit">
                Login
              </Button>
            </Col>
            <Col md="auto">
              <Button variant="primary" size="lg" href="/register">
                Register
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-md-center mt-3">
            <Col md="auto">
              <a variant="primary" size="lg" href="/forgot">
                Forgot Password
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </Form>
  );
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }
