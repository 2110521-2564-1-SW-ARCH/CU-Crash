import { Button, Form, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { API_URL } from '../../constants';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const queryParams = new URLSearchParams(window.location.search);
    let history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            'identifier': queryParams.get('identifier'),
            'new_password': password
        }
        console.log('param => ' + queryParams.get('identifier'));
        const res = await axios.put(
            `${API_URL}/user/reset_password`,
            data,
        );
        console.log(res)
        history.push("/login")
    //     // console.log(res.data.access_token)
    //     // alert("Send email complete")
    //     // history.push('/login')
    }

    return (
        <Form>
            <Container>
                <Row className="justify-content-md-center  mt-3">
                    <Col md="auto">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <h1 className="font-weight-bold">
                                Enter your new Password
                            </h1>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center mt-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>New password</Form.Label>
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
                        <Button variant="primary" size="lg"
                        onClick={handleSubmit}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}
