import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import AddSupplementaryForm from "../../components/AddSupplementaryForm";
import axios from "axios";
import { API_URL } from "../../constants";

export default function Supplementary() {
  const [Supplementaries, setSupplementaries] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("all");
  const options = [
    { value: "all", label: "All" },
    { value: "saha", label: "Saha" },
    { value: "social", label: "Social" },
    { value: "science", label: "Science" },
    { value: "human", label: "Human" },
  ];

  const userToken = JSON.parse(sessionStorage.getItem("token"));

  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: `${API_URL}/supplementary/all`,
      params: {
        category: value,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "json",
    });

    console.log(res.data);
    setSupplementaries(res.data);
  }, [value]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCreateReviewFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

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
              <th>Subject ID</th>
              <th>Subject</th>
              <th>Supplementary</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {Supplementaries &&
              Supplementaries.filter(
                (supplementary) => value == 'all' || supplementary.subject.category == value
              ).map((supplementary) => (
                // Supplementaries.map((supplementary) => (
                <tr key={supplementary.id}>
                  <td>{supplementary.subject_id}</td>
                  <td>{supplementary.subject.short_name}</td>
                  <td>{supplementary.url}</td>
                  <td>{supplementary.subject.category}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <Button onClick={handleShow}>Add supplementary</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add subject review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSupplementaryForm onSubmit={onCreateReviewFormSubmit} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
