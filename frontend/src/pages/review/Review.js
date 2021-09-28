import { useState, useEffect } from "react";
import styles from "./review.css";
// import axios from 'axios';

export default function Review() {
  // const [Reviews,setReviews] = useState([]);
  const Reviews = [
    {
      id: "001",
      subject: "review1",
      author: "author1",
      body:"body1",
      create: "01-02-2021",
      category: "science",
    },
    {
      id: "002",
      subject: "review2",
      author: "author2",
      body:"body2",
      create: "15-02-2021",
      category: "social",
    },
    {
      id: "003",
      subject: "review3",
      author: "author3",
      body:"body3",
      create: "21-02-2021",
      category: "science",
    },
    {
      id: "004",
      subject: "review4",
      author: "author4",
      body:"body4",
      create: "27-04-2021",
      category: "social",
    },
  ];

  // useEffect(async ()=>{
  //     const res = await axios({
  //         method: 'get',
  //         url:`http://localhost:8000/review`,
  //         headers:{
  //             'apikey': 'apikey',
  //         },
  //         responseType: "json",
  //     });

  //     console.log(res.data.reviews)
  //     setReviews(res.data.reviews)
  // },[]);

  return (
    <div className="container">
      <h3 className="p-3 text-center">Reviews</h3>
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
                <td>{review.create}</td>
                <td>{review.category}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
