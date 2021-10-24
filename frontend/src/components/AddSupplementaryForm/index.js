import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";

const options = [
    { value: "saha", label: "Saha" },
    { value: "social", label: "Social" },
    { value: "science", label: "Science" },
    { value: "human", label: "Human" },
];


export default function AddReviewForm({ onSubmit, form }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("")
    const [category, setCategory] = React.useState("saha");
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let currentDate = `${date}-${month < 10 ? `0${month}` : `${month}`}-${year}`
    return (
        <Form onSubmit={onSubmit}>

            <Form.Group className="justify-content-md-center" controlId="ControlTextarea">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                    type="textarea"
                    placeholder="Subject"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>


            <Form.Group className="justify-content-md-center mt-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                    className="mt-1"
                    style={{ float: "right" }}
                >
                    {options.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="justify-content-md-center mt-3">Supplementary</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="justify-content-md-center mt-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Created at: {currentDate}</Form.Label>
            </Form.Group>
            <Button
                style={{ float: "right" }}
                className="justify-content-md-center mt-1" variant="primary" type="submit" block>
                Create
            </Button>
        </Form>
    );
};