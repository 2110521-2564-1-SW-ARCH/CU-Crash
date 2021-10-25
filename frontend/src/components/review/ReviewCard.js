import { Card, ListGroup } from "react-bootstrap";

export default function ReviewCard({ review }) {
  const { subject:{ id, short_name, category }, content, rating, author:{ name }, updated_at } = review

  return (
    <Card style={{ width: '24rem' }} className="m-1">
        <Card.Body>
            <Card.Title>{`${id}  ${short_name}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{`${category}, ${rating}`}</Card.Subtitle>
            <Card.Text>{content}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
            <ListGroup.Item>{`by ${name}`}</ListGroup.Item>
        </ListGroup>
    </Card>
  )
}
