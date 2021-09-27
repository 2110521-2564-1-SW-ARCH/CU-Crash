import { Button, Form, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
// import './loginForm.css';
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email + ' ' + password);
        // const res = await axios({
        //     method: 'post',
        //     url:`http://localhost:8000/user/forgot`, 
        //     data:{ 
        //        email: email, 
        //        password: password },
        //     headers:{
        //         'apikey': 'apikey',
        //     },
        //     responseType: "json",
        // });
        // console.log(res.data.access_token)
        alert("Send mail complete")
        history.push('/login')
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row className="justify-content-md-center mt-3">
                    <Col md="auto">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <h1 class="font-weight-bold">
                                Forgot Password
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

                <Row className="justify-content-md-center mt-3">
                    <Col md="auto">
                        <Button variant="primary" size="lg" type="submit">
                            Send
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}