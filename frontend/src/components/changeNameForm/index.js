import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { API_URL } from "../../constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ChangeNameForm({ setToken, setProfile }) {
  const [name, setName] = useState("");
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("user-info"));
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    // setShow(false);
  //   axios
  //     .put(`${API_URL}/user/change/name?name=${name}`, {}, config)
  //     .then( res => sessionStorage.setItem("token", JSON.stringify(res.access_token)))
  //     .catch( error => console.log(error));
  //     .then(res => {
  //         // user.username = name;
  //         sessionStorage.setItem("token", JSON.stringify(res.access_token));
  //         sessionStorage.setItem("user-info", JSON.stringify(user));
  //         console.log("Change name Succesfully");
  //     });
  // };
    user.username = name;
    // setProfile(user);
    const res = async () => await axios.put(
      `${API_URL}/user/change/name?name=${name}`,
      {},
      config,
    ).then(res=>{
      console.log(res);
      // await setTimeout(1000);
    })
    // const fetchdata = async () => await axios.get( serverPath )
    // const result =  await res();
    // result.then(res=>setProfile(res.data.user));
    // setToken(res.data.access_token);
    // setProfile(user);
    // if (res?.status == 200) {
    //   setToken(res.data.access_token)
    //   setProfile(res.data.user)
    // } else {
    //   console.log("Fail");
    // }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className="justify-content-md-center"
        controlId="ControlTextarea"
      >
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Button
        style={{ float: "right" }}
        className="justify-content-md-center mt-3"
        variant="primary"
        type="submit"
        // onClick={handleSubmit}
        block
      >
        Change
      </Button>
    </Form>
  );
}
