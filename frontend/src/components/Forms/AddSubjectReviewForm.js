import { Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants"
import axios from "axios";
import { useHistory } from "react-router-dom";
import SelectSearch, { fuzzySearch } from "react-select-search";

export default function AddSubjectReviewForm({setShow}) {
  const userToken = JSON.parse(sessionStorage.getItem("token"));
  let history = useHistory();
  const [review, setReview] = useState({
    subject_id: "",
    rating: 0,
    content: "",
  });
  const [subjectData, setSubjectData] = useState([])
  const [value, setValue] = useState("");

  // const do = (e) => {
  //   setValuerev
  // }
  const handleSubmit = async () => {
    const x = review
    x.subject_id = value
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    setShow(false)
    const res = await axios.post(
      `${API_URL}/review/subject_review/create`,
      x,
      config,
    );
    if (res?.status == 200) {
      console.log('Sent Review Succesfully');
      
    } else {
      console.log("Sent Review Fail");
    }
    
  };

  console.log(subjectData)
  useEffect(async () => {
    console.log(`work!`)
    const res = await axios({
      method: "get",
      url: `${API_URL}/subject/all`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "json",
    });

    if (res?.status == 200) {
      console.log(`res -> ${JSON.stringify(res.data)}`);
      const subject_title = res.data.map(subject => {
        return {
          name: `${subject.id}   ${subject.short_name}`,
          value: subject.id
        }
      });  
      setSubjectData(subject_title);
    }
  }, []);

  const tmp = () => {

  }
  return (
    <Form>
        <Form.Group
          className="justify-content-md-center"
          controlId="ControlTextarea"
        >
          <Form.Label>Subject</Form.Label>
          {/* <Form.Control
            type="textarea"
            placeholder="Subject"
            value={review.subject_id}
            onChange={(e) => setReview({...review, "subject_id": e.target.value})}
          /> */}

        <SelectSearch
          options={subjectData}
          value={value}
          onChange={setValue}
          search
          filterOptions={fuzzySearch}
          placeholder="subject"
        />
        </Form.Group>

      <Form.Group
        className="justify-content-md-center mt-3"
        controlId="ControlTextarea"
      >
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Rating"
          value={review.rating}
          onChange={(e) => setReview({...review, "rating": e.target.value})}
        />
        
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="justify-content-md-center mt-3">
          Review
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={review.content}
          onChange={(e) => setReview({...review, "content": e.target.value})}
        />
      </Form.Group>
      <Button
        style={{ float: "right" }}
        className="justify-content-md-center mt-3"
        variant="primary"
        onClick={handleSubmit}
        block
      >
        Create
      </Button>
    </Form>
  );
}
