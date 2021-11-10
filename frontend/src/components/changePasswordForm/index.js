import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { API_URL } from "../../constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ChangePasswordForm({ onSubmit, form }) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isFail, setIsFail] = useState("");
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  let history = useHistory();

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    console.log('test')
    const res = await axios.put(
      `${API_URL}/user/change/password`,
      {
        password: oldPassword,
        new_password: newPassword
      },
      config
    );

    // console.log(`res -> ${JSON.stringify(res)}`);
    if (res?.status == 200) {
      console.log("change password complete!");
      history.push("/home");
      history.go(0);
    } else {
      setIsFail(true)
    }
  };

  return (
    <Form>
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
      <Form.Label>{isFail && "Something's wrong!"}</Form.Label>
      <Button
        style={{ float: "right" }}
        className="justify-content-md-center mt-3"
        variant="primary"
        onClick={handleSubmit}
        block
      >
        Change
      </Button>
    </Form>
  );
}
