import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddReviewForm from "../../../components/AddReviewForm";
import { API_URL } from '../../../constants';

export default function Instructor() {
  const [Reviews, setReviews] = useState([]);
  const [value, setValue] = useState("saha");
  const [sort, setSort] = useState("ascending");
  
  let history = useHistory();

  const options = [
    { value: "saha", label: "Saha" },
    { value: "social", label: "Social" },
    { value: "science", label: "Science" },
    { value: "human", label: "Human" },
  ];

  const sorts = [
    { value: "ascending", label: "Ascending" },
    { value: "descending", label: "Descending" },
  ];

  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  async function getRecommend() {
    const res = await axios({
      method: "get",
      url: `${API_URL}/reviews/recommend/`,
      params: {
        user_id: 1,
        category: value,
        max_results: 3,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "json",
    });
    return res
  };

  useEffect(() => {
    try {
      const res = getRecommend();
      setReviews(res.data.recommendations);
      console.log(res.data.recommendations);
    } catch (e) {
      console.log(e)
    }
  }, [value]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <div className="container">
      <Row className="justify-content-md-center mt-5">
        <h3 className="p-3 text-center">Instructor Reviews</h3>
      </Row>

      {/* <p>{value}</p> */}

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
            <Form.Control
              placeholder="Search"
            />
          </Form.Group>
        </Col>

        <Col md="auto">
          <Button>Search</Button>
        </Col>

        {/* <Col md="auto">
          <select
            sort={sort}
            onChange={(e) => setSort(e.currentTarget.sort)}
            className="mt-1"
          >
            {sorts.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Col> */}
      </Row>

      <Row className="justify-content-md-center mt-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Instructor</th>
              <th>Subject</th>
              <th>Review</th>
              <th>Author</th>
              <th>Create</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {Reviews &&
              Reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.instructor}</td>
                  <td>{review.subject}</td>
                  <td>{review.body}</td>
                  <td>{review.author}</td>
                  <td>{review.createdAt}</td>
                  <td>{review.category}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <Button onClick={handleShow}>Add review</Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add instructor review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddReviewForm onSubmit={onFormSubmit} form="instructor"/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* <Row className="justify-content-md-center mt-3">
          <Col md="auto">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              onClick={handleChange}
            >
              Log out
            </Button>
          </Col>
        </Row> */}
    </div>
  );
}
