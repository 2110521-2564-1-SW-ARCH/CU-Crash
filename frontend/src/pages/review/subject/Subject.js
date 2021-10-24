import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CreateForm from "../../../components/CreateForm";

// const { env } = require("../../env");
export default function Subject() {
  const [Reviews, setReviews] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("saha");
  // const [sort, setSort] = React.useState("ascending");
  const mock_Reviews = [
    {
      id: "001",
      subject: "review1",
      author: "author1",
      body: "body1",
      createdAt: "01-02-2021",
      category: "science",
    },
    {
      id: "002",
      subject: "review2",
      author: "author2",
      body: "body2",
      createdAt: "15-02-2021",
      category: "social",
    },
    {
      id: "003",
      subject: "review3",
      author: "author3",
      body: "body3",
      createdAt: "21-02-2021",
      category: "science",
    },
    {
      id: "004",
      subject: "review4",
      author: "author4",
      body: "body4",
      createdAt: "27-04-2021",
      category: "social",
    },
  ];

  const options = [
    { value: "saha", label: "Saha" },
    { value: "social", label: "Social" },
    { value: "science", label: "Science" },
    { value: "human", label: "Human" },
  ];
  // const sorts = [
  //   { value: "ascending", label: "Ascending" },
  //   { value: "descending", label: "Descending" },
  // ];
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  useEffect(async () => {
    // const res = await axios({
    //   method: "get",
    //   url: `${process.env.REACT_APP_API_URL}/reviews/recommend/`,
    //   params: {
    //     user_id: 1,
    //     category: value,
    //     max_results: 3,
    //   },
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //   },
    //   responseType: "json",
    // });

    // console.log(res.data.recommendations);
    // setReviews(res.data.recommendations);
    setReviews(mock_Reviews);
  }, [value]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCreateReviewFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  function handleChange(e) {
    e.preventDefault();
    sessionStorage.clear();
    history.push("/login");
    // alert('Log out complete')
    console.log("log out");
  }

  return (
    <div className="container">
      <Row className="justify-content-md-center mt-5">
        <h3 className="p-3 text-center">Subject Reviews</h3>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
          <Modal.Title>Add subject review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm onSubmit={onCreateReviewFormSubmit} />
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
