import { Button, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import ChangePasswordForm from "../../components/changePasswordForm";
import ChangeNameForm from "../../components/changeNameForm";
import axios from "axios";
import { API_URL } from '../../constants';

export default function Setting({ setToken, setProfile }) {
  const [Reviews, setReviews] = useState([]);
  let history = useHistory();
  const [value, setValue] = React.useState("saha");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  // useEffect(async () => {
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

  //   console.log(res.data.recommendations);
  //   setReviews(res.data.recommendations);
  // }, [value]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangePasswordFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const onChangeNameFormSubmit = (e) => {
    e.preventDefault();
    handleClose2();
  };

  return (
    <div className="container">
       <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <img
            width="200"
            height="200"
            src="https://cdn-icons.flaticon.com/png/512/807/premium/807390.png?token=exp=1636128826~hmac=d438f0c4abb1969dfccae72687de292f"
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <h3 className="p-3 text-center">Settings</h3>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <Button onClick={handleShow2} variant="primary" size="lg">
            {/* change name */}
            Update profile
          </Button>
        </Col>
      </Row>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangeNameForm  setToken={setToken} setProfile={setProfile}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <Button onClick={handleShow} variant="primary" size="lg">
            Change password
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePasswordForm onSubmit={onChangePasswordFormSubmit} />
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
