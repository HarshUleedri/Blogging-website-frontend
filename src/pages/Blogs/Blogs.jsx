import authAxios from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBookmark from "../../hook/useBookmark";
import Card from "../Blogs/Components/Card";
const Blogs = () => {
  const [isBookmarked, toggleBookmark] = useBookmark();
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();

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
      <div className="space-y-2">
        {allBlogs.map((blog) => (
          <div
            className="w-full"
            key={blog._id}
            onClick={() => navigate(`/blog/${blog.slug}`)}
          >
            <Card blog={blog} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
