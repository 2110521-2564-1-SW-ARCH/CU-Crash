import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { API_URL } from "../../constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ChangeNameForm({ setToken, setProfile }) {
  const [name, setName] = useState("");

  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("user-info"));

  let history = useHistory();

  const doSetName = (value) => {
    setName(value)
    console.log(name)
  }

  const handleSubmit = async () => {
    console.log(`user -> ${JSON.stringify(user)}`);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    console.log(`user -> ${JSON.stringify(user)}`);
    const res = await axios.put(
      `${API_URL}/user/change/name?name=${name}`,
      {},
      config,
    )

    console.log(`res -> ${JSON.stringify(res)}`)
    if (res?.status == 200) {
      console.log("here!!!")
      user.username = name
      sessionStorage.setItem("user-info", JSON.stringify(user));
      history.push("/home");
      history.go(0);
    }

  };

  return (
    <Form>
      <Form.Group
        className="justify-content-md-center"
        controlId="ControlTextarea"
      >
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Name"
          value={name}
          // onChange={(e) => setName(e.target.value)}
          onChange={(e) => doSetName(e.target.value)}
        />
      </Form.Group>

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
