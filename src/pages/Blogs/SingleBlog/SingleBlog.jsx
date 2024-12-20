import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleBlog = () => {
  //state for holding the data which came form api
  const [singleBlogData, setSingleBlogData] = useState({});
  // getting slug from url
  const { slug } = useParams();
  //fetching data from api
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/blogs/${slug}`
      );
      setSingleBlogData(response.data);
    };
    fetchBlog();
  }, [slug]);

  //date formatting
  const isoData = singleBlogData.createdAt;
  const date = new Date(isoData);

  return (
    <>
      <div className="bg-gray-600 h-[100vh]">
        <div className="max-w-5xl mx-auto">
          <h1>{singleBlogData.title}</h1>
          <p>{singleBlogData.content}</p>
          <p>{singleBlogData.author}</p>
          <p className="mb-4">
            {date.toLocaleString("en-US", { dateStyle: "medium" })}
          </p>
          <Link
            to={`/edit/${singleBlogData.slug}`}
            className="px-4 py-2 font-semibold text-white bg-gray-700 rounded-md cursor-pointer"
          >
            update
          </Link>
        </div>
      </div>
    </>
  );
};
export default SingleBlog;
