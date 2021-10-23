import { Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Supplementary() {
  const [Supplementaries, setSupplementaries] = useState([]);
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
    setSupplementaries(res.data.recommendations);
  }, [value]);

  return (
    <div className="container">
      <Row className="justify-content-md-center mt-5">
        <h3 className="p-3 text-center">Supplementaries</h3>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <h4 style={{ color: "red" }}> Warning : DO NOT SHARE </h4>
        </Col>
      </Row>

      {/* <p>{value}</p> */}

      <Row className="justify-content-md-center mt-3">
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
            <Form.Control placeholder="Search" />
          </Form.Group>
        </Col>

        <Col md="auto">
          <Button>Search</Button>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Supplementary</th>
              <th>Author</th>
              <th>Create</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {Supplementaries &&
              Supplementaries.map((supplementary) => (
                <tr key={supplementary.id}>
                  <td>{supplementary.subject}</td>
                  <td>{supplementary.body}</td>
                  <td>{supplementary.author}</td>
                  <td>{supplementary.createdAt}</td>
                  <td>{supplementary.category}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <Button>Add supplementary</Button>
        </Col>
      </Row>
    </div>
  );
}
