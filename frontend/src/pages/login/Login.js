import { Button, Form, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email + ' ' + password);
        //const res = await axios.post(` backend link `,{email,password});
        
    }
    
    return (
        <Form onSubmit={handleSubmit}>

            <Container>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3 md-5" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
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
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Row>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </ButtonGroup>
                            
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form.Group>    
            </Container>  
        </Form>
    );
}
