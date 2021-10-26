import { Card, ListGroup } from "react-bootstrap";

export default function ReviewCardINS({ review }) {
  const { instructor:{ id, short_name, first_name, last_name, department }, content, rating, author:{ name }, updated_at } = review

  return (
    <Card style={{ width: '24rem' }} className="m-1">
        <Card.Body>
            <Card.Title>{`${first_name}  ${last_name} (${short_name})`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{`${department}, ${rating}`}</Card.Subtitle>
            <Card.Text>{content}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
            <ListGroup.Item>{`by ${name}`}</ListGroup.Item>
        </ListGroup>
    </Card>
  )
}
