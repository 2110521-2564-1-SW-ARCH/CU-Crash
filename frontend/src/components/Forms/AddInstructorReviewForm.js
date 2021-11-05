import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectSearch, { fuzzySearch } from "react-select-search";


export default function AddInstructorReviewForm({ setShow }) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  let history = useHistory();
  const [value, setValue] = useState("");
  const [review, setReview] = useState({
    subject_id: "",
    rating: 0,
    content: "",
  });
  const [instructors, setInstructors] = useState([]);
  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: `${API_URL}/instructor/all`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "json",
    })
    .then((res) =>{
        const data = res.data;
        data.forEach(instructor => {
          setInstructors((prevItems) => [
            ...prevItems,
            {
              name: instructor.full_name,
              value: instructor.id,
            },
          ]);
          console.log(instructor.id)
        });
    })
  }, []);

  const handleSubmit = async () => {
    // setReview({ ...review, instructor_id: value })
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    setShow(false);
    const res = await axios.post(
      `${API_URL}/review/instructor_review/create`,
      review,
      config
    );
    if (res?.status == 200) {
      console.log("Sent Review Succesfully");
    } else {
      console.log("Sent Review Fail");
    }
  };

  useEffect(()=>{
      setReview({ ...review, instructor_id: value })
  },[value])
  return (
    <Form>
      <Form.Group
        className="justify-content-md-center"
        controlId="ControlTextarea"
      >
        <Form.Label>Instructor name</Form.Label>
        <SelectSearch
          options={instructors}
          value={value}
          onChange={setValue}
          search
          filterOptions={fuzzySearch}
          placeholder="Instructor"
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
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
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
          onChange={(e) => setReview({ ...review, content: e.target.value })}
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
