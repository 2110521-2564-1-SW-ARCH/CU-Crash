import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";

export default function ChangeNameForm({ onSubmit, form }) {
  const [name, setName] = useState("");
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group
        className="justify-content-md-center"
        controlId="ControlTextarea"
      >
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Button
        style={{ float: "right" }}
        className="justify-content-md-center mt-3"
        variant="primary"
        type="submit"
        block
      >
        Change
      </Button>
    </Form>
  );
}
