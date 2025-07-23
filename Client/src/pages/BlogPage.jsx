import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blog_data } from "../assets/assets";

function BlogPage() {
  const { id } = useParams();
  console.log("id", id);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlogData = async () => {
    try {
      const data = blog_data.find((item) => item._id === id);
      setData(data);
      console.log("Blog Data is", data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (error) {
    return <h1>Error comes</h1>;
  }

  return data ? (
    <div>
      <h1>Blog Page</h1>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default BlogPage;
