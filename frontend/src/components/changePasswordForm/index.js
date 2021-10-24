import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";

export default function ChangePasswordForm({ onSubmit, form }) {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group
        className="justify-content-md-center"
        controlId="ControlTextarea"
      >
        <Form.Label>Old password</Form.Label>
        <Form.Control
          type="password"
           value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        className="justify-content-md-center mt-3"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label>New password</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
