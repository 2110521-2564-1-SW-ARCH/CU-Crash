import { Button, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./review.css";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
// const { env } = require("../../env");
export default function Review() {
  const [Reviews, setReviews] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("saha");
  const [show, setShow] = useState(false);
  // const Reviews = [
  //   {
  //     id: "001",
  //     subject: "review1",
  //     author: "author1",
  //     body:"body1",
  //     create: "01-02-2021",
  //     category: "science",
  //   },
  //   {
  //     id: "002",
  //     subject: "review2",
  //     author: "author2",
  //     body:"body2",
  //     create: "15-02-2021",
  //     category: "social",
  //   },
  //   {
  //     id: "003",
  //     subject: "review3",
  //     author: "author3",
  //     body:"body3",
  //     create: "21-02-2021",
  //     category: "science",
  //   },
  //   {
  //     id: "004",
  //     subject: "review4",
  //     author: "author4",
  //     body:"body4",
  //     create: "27-04-2021",
  //     category: "social",
  //   },
  // ];

  const options = [
    { value: "saha", label: "Saha" },
    { value: "social", label: "Social" },
    { value: "science", label: "Science" },
    { value: "human", label: "Human" },
  ];
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:5567/reviews/recommend/`,
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
        <Col md="auto">
          <a href="/reviews/subjects">Subject reviews</a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">Subjects reviews are blah blah blah</Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/reviews/instructors">Instructor reviews</a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">Instructors reviews are blah blah blah</Col>
      </Row>
    </div>
  );
}
