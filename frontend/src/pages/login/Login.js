import { Button, Form, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './loginForm.css';
// import PropTypes from 'prop-types';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email + ' ' + password);
        // const res = await axios({
        //     method: 'post',
        //     url:`http://localhost:8000/user/login`, 
        //     data:{ 
        //        email: email, 
        //        password: password },
        //     headers:{
        //         'apikey': 'apikey',
        //     },
        //     responseType: "json",
        // });
        history.push('/home')
        // console.log(res.status)
        // setToken(res.data.access_token)
        // console.log(res.data.access_token)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row className="justify-content-md-center mt-3">
                    <Col md="auto">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <h1 class="font-weight-bold">
                                Login
                            </h1>
                        </Form.Group>
                    </Col>

                </Row>


                <Row className="justify-content-md-center">
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
                    <Col md="auto">
                        <Button variant="primary" size="lg" href="/forgot">
                            Forgot Password
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }