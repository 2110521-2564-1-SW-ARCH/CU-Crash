import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../constants"
import axios from "axios";

const options = [
  { value: "saha", label: "Saha" },
  { value: "social", label: "Social" },
  { value: "science", label: "Science" },
  { value: "human", label: "Human" },
];

export default function AddReviewForm({ onSubmit, form,setShow }) {
  const [category, setCategory] = React.useState("saha");
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let currentDate = `${date}-${month < 10 ? `0${month}` : `${month}`}-${year}`;

  const [supplementary, setSupplementary] = useState({
    subject_id: "",
    url: "",
  });
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const handleSubmit = async () => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     "Content-Type": "application/json",
    //   },
    // };

    const res = await axios({
        method: "post",
        url: `${API_URL}/supplementary/create`,
        params: {
          subject_id: supplementary.subject_id,
          url:supplementary.url,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        responseType: "json",
      });
    setShow(false);
    // const res = await axios.post(
    //   `${API_URL}/supplementary/create`,
    //   supplementary,
    //   config
    // );
    if (res?.status == 200) {
      console.log("Sent Supplementary Succesfully");
    } else {
      console.log("Sent Supplementary Fail");
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group
        className="justify-content-md-center"
        controlId="ControlTextarea"
      >
        <Form.Label>Subject ID</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Subject ID"
          value={supplementary.subject_id}
          onChange={(e) =>
            setSupplementary({ ...supplementary, subject_id: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="justify-content-md-center mt-3">
          Supplementary URL
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={supplementary.url}
          placeholder="ex. google drive URL"
          onChange={(e) =>
            setSupplementary({ ...supplementary, url: e.target.value })
          }
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
        className="justify-content-md-center mt-3"
        variant="primary"
        onClick={handleSubmit}
        block
      >
        Create
      </Button>
    </Form>
  );
}
