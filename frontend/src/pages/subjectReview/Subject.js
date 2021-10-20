import {
  Button,
  Row,
  Col,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./subject.css";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
// const { env } = require("../../env");
export default function Subject() {
  const [Reviews, setReviews] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("saha");
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

  const CustomNavBar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">CU-CRASH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <NavDropdown title="Review" id="basic-nav-dropdown">
                <NavDropdown.Item href="/reviews/subjects">
                  Subjects
                </NavDropdown.Item>
                <NavDropdown.Item href="/reviews/instructors">
                  Instructors
                </NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
              <Nav.Link href="#/profile">Profie</Nav.Link>
              <Button variant="primary" type="submit" onClick={handleChange}>
                Log out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  return (
    <div className="container">
      <h3 className="p-3 text-center">Subject Reviews</h3>
      {/* <p>{value}</p> */}
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
      <Button style={{ float: "right" }}>Create review</Button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Body</th>
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
