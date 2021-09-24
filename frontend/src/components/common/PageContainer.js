import { Container, Row, Col } from 'react-bootstrap';

export default function PageContainer(props) {
    return (
        <Container fluid="md">
            <Row>
                <Col>{props.children}</Col>
            </Row>
        </Container>
    );
}
