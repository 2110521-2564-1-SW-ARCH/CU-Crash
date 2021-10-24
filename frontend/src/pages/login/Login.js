import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from '../../constants';
import axios from "axios";

export default function Login({ setToken, setProfile }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const data = `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`;
    const res = await axios.post(
      `${API_URL}/user/login`,
      data,
      config,
    );
    if (res?.status == 200) {
      setToken(res.data.access_token)
      setProfile(res.data.user)
      console.log('Login Succesfully');

      history.push("/home");
      history.go(0);
    } else {
      console.log("Login Fail");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <Row className="justify-content-md-center mt-3">
              <Col md="auto">
                <h1 className="font-weight-bold">CU-CRASH</h1>
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
            </div>
        </Container>
      </Form>
      <Container>
        <Row className="justify-content-md-center mt-3">
          <Col md="auto">
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              Login
            </Button>
          </Col>
          <Col md="auto">
            <Button variant="primary" size="lg" href="/register">
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
