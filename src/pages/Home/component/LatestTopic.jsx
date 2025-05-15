import { useEffect, useState } from "react";
import { getAllblogs } from "../../../api/BlogApi/BlogApi";
import { useNavigate } from "react-router-dom";

const LatestTopic = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  //hook

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const data = await getAllblogs();
      setAllBlogs(data);
    };
    fetchAllBlogs();
  }, []);

  const filterBlogs = allBlogs?.filter((blog) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const blogDate = new Date(blog.createdAt);
    return blogDate >= sevenDaysAgo;
  });

  return (
    <div className="border divide-y rounded-md">
      {filterBlogs.map((blog) => (
        <div
          onClick={() => navigate(`blog/${blog.slug}`)}
          className="p-4 text-sm hover:bg-light/10"
          key={blog._id}
        >
          <span className="text-base font-semibold">#</span>
          {blog.title}
        </div>
      ))}
    </div>
  );
};

export default LatestTopic;
