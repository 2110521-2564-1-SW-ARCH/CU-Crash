import { Button, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./instructor.css";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
export default function Instructor() {
  const [Reviews, setReviews] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("saha");

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
      <h3 className="p-3 text-center">Instructor Reviews</h3>
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
