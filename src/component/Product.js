import React, { useState, useEffect } from "react";
import Axios from "axios";

function Product() {

  const [posts, setPostData] = useState([]);

  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
      console.log(res);
      setPostData(res.data)
    }).catch(error => {
      console.log(error)
    })
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post => (
          <li>{post.name}</li>
        ))
        }
      </ul>
      <h1>hello</h1>
    </div>
  )
}

export default Product;
