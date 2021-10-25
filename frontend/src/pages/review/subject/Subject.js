import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddSubjectReviewForm from "../../../components/Forms/AddSubjectReviewForm";
import {
  API_URL,
  SUBJECT_CATEGORY_OPTIONS as options,
} from "../../../constants";
import ReviewCard from "../../../components/review/ReviewCard";

export default function Subject() {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = React.useState("all");

  // const [sort, setSort] = React.useState("ascending");

  // const getAllSubject = async () => {
  //   const res = await axios.get(`${API_URL}/subject/all`);
  //   if (res?.status == 200) {
  //     console.log(res.data)
  //     console.log('Login Succesfully');
  //   } else {
  //     console.log("Login Fail");
  //   }
  // };

  // const sorts = [
  //   { value: "ascending", label: "Ascending" },
  //   { value: "descending", label: "Descending" },
  // ];
  const userToken = JSON.parse(sessionStorage.getItem("token"));

  useEffect(async () => {
    const res = await axios({
      method: "get",
      url:
        value == "all"
          ? `${API_URL}/review/subject_review/all`
          : `${API_URL}/review/subject_review/get_by_category`,
      params: {
        category: value,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "json",
    });
    setReviews(res.data);
    console.log(res.data);
  }, [value]);

  return (
    <div className="container">
      <Row className="justify-content-md-center mt-5">
        <h3 className="p-3 text-center">Subject Reviews</h3>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <select
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            className="mt-1"
          >
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Col>

        <Col md="auto">
          <Form.Group className="mb-3" controlId="formBasicSearch">
            <Form.Control placeholder="Search" />
          </Form.Group>
        </Col>

        <Col md="auto">
          <Button>Search</Button>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-1">
        <Col md="auto">
          <Button onClick={() => setShow(true)}>Add review</Button>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        {reviews && reviews.map((review) => <ReviewCard review={review} />)}
      </Row>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add subject review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSubjectReviewForm />
        </Modal.Body>
      </Modal>
    </div>
  );
}
