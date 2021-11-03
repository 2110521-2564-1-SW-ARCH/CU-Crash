import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { API_URL } from "../../constants"
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ChangeNameForm() {
  const [name, setName] = useState("");
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    // setShow(false);
    const res = await axios.put(
      `${API_URL}/user/change/name`,
      {params:{name}},
      config
    );
    if (res?.status == 200) {
      console.log("Change name Succesfully");
    } else {
      console.log("Change name Fail");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
        onClick={handleSubmit}
        block
      >
        Change
      </Button>
    </Form>
  );
}
