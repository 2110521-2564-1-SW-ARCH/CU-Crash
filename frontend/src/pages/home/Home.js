import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

export default function Home() {
  const tokenString = sessionStorage.getItem("token");
  console.log("tokenString " + tokenString);
  const userToken = JSON.parse(tokenString);
  console.log("userToken " + userToken);
  return (
    <div className="container">
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <img
            width="250"
            height="250"
            src="https://cdn-icons-png.flaticon.com/512/1055/1055673.png"
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <h2>What is CU-CRASH?</h2>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          Subject and instructor reviews are some of the important things that
          help students decide if they should register for that subject.
          However, looking for a subject review may take more than hours through
          over 10 different sources and end up with incomplete data from 5 years
          ago. Moreover, it is impossible to know who wrote that review or if
          they register in that subject. This is the reason why we want to
          create CU-CRASH, a platform that contains reviews and supplementaries
          in one place, and also ensures that the data is coming from a trusted
          source.
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <h3>Our Services</h3>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          CU-CRASH includes 3 main services as mentioned below.
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/reviews/subject">
            <h4>Subject Reviews</h4>
          </a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          Subject reviews is a service for students to read, write, and search
          reviews of subjects, which will help students to decide if they should
          register for that specific subject. Each review was approved by
          administrator contains subject ID, subject name, rating, comment,
          author, and category of that subject.
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/reviews/instructor">
            <h4>Instructor Reviews</h4>
          </a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          Instructor reviews is a service for students to read, write, and
          search reviews of instructors, which will help students to decide
          which instructor they should study with. Each review was approved by
          administrator, which contains instructor name, rating, comment,
          author, and faculty of that instructor.
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <a href="/supplementaries">
            <h4>Supplementaries</h4>
          </a>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          Supplementaries is a service for students to read, write, and search
          supplementaries of subjects, which will help students study for that
          specific subject. Each supplementary contains subject ID, subject
          name, supplementary, and category of that subject.
        </Col>
      </Row>
    </div>
  );
}
