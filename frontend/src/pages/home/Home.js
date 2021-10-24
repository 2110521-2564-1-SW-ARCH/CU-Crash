import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../../constants';

export default function Home() {
  const tokenString = sessionStorage.getItem("token");
  console.log("tokenString " + tokenString)
  const userToken = JSON.parse(tokenString);
  console.log("userToken " + userToken)
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
