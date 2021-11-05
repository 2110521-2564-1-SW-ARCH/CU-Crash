import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddInstructorReviewForm from "../../../components/Forms/AddInstructorReviewForm";
import {
  API_URL,
  INSTRUCTOR_CATEGORY_OPTIONS as options,
} from "../../../constants";
import ReviewCardINS from "../../../components/review/ReviewCardINS";

export default function Instructor() {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = React.useState("all");
  const [search,setSearch] =useState('')

  const userToken = JSON.parse(sessionStorage.getItem("token"));

  // async function getRecommend() {
  //   const res = await axios({
  //     method: "get",
  //     url: `${API_URL}/reviews/recommend/`,
  //     params: {
  //       user_id: 1,
  //       category: value,
  //       max_results: 3,
  //     },
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //     responseType: "json",
  //   });
  //   return res
  // };

  // useEffect(() => {
  //   try {
  //     const res = getRecommend();
  //     setReviews(res.data.recommendations);
  //     console.log(res.data.recommendations);
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [value]);

  // const [instructor,setInstructor] = useState([]);
  useEffect(async () => {
    const res = await axios({
      method: "get",
      url:
        value == "all"
          ? `${API_URL}/review/instructor_review/all`
          : `${API_URL}/review/instructor_review/get_by_department`,
      params: {
        department: value,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "json",
    });
    setReviews(res.data);
    // console.log(res.data);
  }, [value, show]);


  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const onFormSubmit = (e) => {
  //   e.preventDefault();
  //   handleClose();
  // };

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
              placeholder="instructor name"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </Form.Group>
        </Col>

        <Col md="auto">
          <Button onClick={() => setShow(true)}>Add review</Button>
        </Col>
        {/* <Col md="auto">
          <Button>Search</Button>
        </Col> */}

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
      {reviews && reviews.filter((review) => review.instructor.full_name.toLowerCase().includes(search)).map((review) => <ReviewCardINS review={review} />)}
      </Row>

      {/* <Row className="justify-content-md-center mt-3"> */}
        {/* <table className="table table-striped table-bordered">
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
        </table> */}
      {/* </Row> */}

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add instructor review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddReviewForm onSubmit={onFormSubmit} form="instructor"/>
        </Modal.Body> */}

        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add instructor review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddInstructorReviewForm setShow={setShow} />
        </Modal.Body>
      </Modal>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      {/* </Modal> */}

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
