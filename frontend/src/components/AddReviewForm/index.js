import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";

const options = [
  { value: "saha", label: "Saha" },
  { value: "social", label: "Social" },
  { value: "science", label: "Science" },
  { value: "human", label: "Human" },
];

export default function AddReviewForm({ onSubmit, form }) {
  const [ins, setIns] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = React.useState("saha");
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let currentDate = `${date}-${month < 10 ? `0${month}` : `${month}`}-${year}`;

  return (
    <Form onSubmit={onSubmit}>
      {form == "instructor" ? (
        <Form.Group controlId="ControlTextarea">
          <Form.Label className="justify-content-md-center">
            Instructor
          </Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Instructor"
            value={ins}
            onChange={(e) => setIns(e.target.value)}
          />
        </Form.Group>
      ) : null}

      {form == "instructor" ? (
        <Form.Group
          className="justify-content-md-center mt-3"
          controlId="ControlTextarea"
        >
          <Form.Label>Subject ID</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
      ) : (
        <Form.Group
          className="justify-content-md-center"
          controlId="ControlTextarea"
        >
          <Form.Label>Subject ID</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
      )}

      <Form.Group
        className="justify-content-md-center mt-3"
        controlId="ControlTextarea"
      >
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="justify-content-md-center mt-3">
          Review
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        className="justify-content-md-center mt-3"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label>Created at: {currentDate}</Form.Label>
      </Form.Group>
      <Button
        style={{ float: "right" }}
        className="justify-content-md-center mt-1"
        variant="primary"
        type="submit"
        block
      >
        Create
      </Button>
    </Form>
  );
}
