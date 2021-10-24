import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

require('dotenv').config();

export default function Home() {
  const [Reviews, setReviews] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("saha");
  const [show, setShow] = useState(false);

  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/reviews/recommend/`,
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

    console.log(res.data.recommendations);
    setReviews(res.data.recommendations);
  }, [value]);

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
        <Col md="auto">[IMG]</Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">What is CU-CRASH?</Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          CU-CRASH is an SE3(?) project by Thira and friends,
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          which includes 3 main services as mentioned below.
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/reviews/subject">Subject Reviews</a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">Subjects reviews is the blah blah blah</Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/reviews/instructor">Instructor Reviews</a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">Instructors reviews is the blah blah blah</Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/supplementaries">Supplementaries</a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">Google drive? let's gooooo</Col>
      </Row>
    </div>
  );
}
