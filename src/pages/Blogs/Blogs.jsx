import authAxios from "../../api/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await authAxios.get(
          "http://localhost:3000/api/blogs/"
        );
        setAllBlogs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div>
        {allBlogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog.slug}`}>
            <div className="px-12 py-12 mb-4 bg-gray-100 ">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                {blog.title}
              </h3>
              <p className="mb-4 ">{blog.content}</p>
              <h4 className="font-semibold ">{blog.author}</h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Blogs;
