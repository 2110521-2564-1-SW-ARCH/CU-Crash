import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { API_URL } from "../../constants"
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddSupplementaryForm({setShow}) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  let history = useHistory();
  const [review, setReview] = useState({
    subject_id: "",
    rating: 0,
    content: "",
  });

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    setShow(false)
    const res = await axios.post(
      `${API_URL}/review//supplementary/create`,
      review,
      config,
    );
    if (res?.status == 200) {
      console.log('Sent Review Succesfully');
      
    } else {
      console.log("Sent Review Fail");
    }
    
  };

  return (
    <Form>
        <Form.Group
          className="justify-content-md-center"
          controlId="ControlTextarea"
        >
          <Form.Label>Subject ID</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Subject"
            value={review.subject_id}
            onChange={(e) => setReview({...review, "subject_id": e.target.value})}
          />
        </Form.Group>

      <Form.Group
        className="justify-content-md-center mt-3"
        controlId="ControlTextarea"
      >
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Rating"
          value={review.rating}
          onChange={(e) => setReview({...review, "rating": e.target.value})}
        />
        
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="justify-content-md-center mt-3">
          Review
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={review.content}
          onChange={(e) => setReview({...review, "content": e.target.value})}
        />
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
