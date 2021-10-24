import { Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

require('dotenv').config();

export default function Setting() {
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

  return (
    <div className="container">
      <Row className="justify-content-md-center mt-5">
        <h3 className="p-3 text-center">Settings</h3>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <Button variant="primary" size="lg" href="#/settings/profile">
            {/* change name */}
            Update profile
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <Button variant="primary" size="lg" href="#/settings/password">
            Change password
          </Button>
        </Col>
      </Row>
    </div>
  );
}
