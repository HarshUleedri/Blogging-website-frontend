import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState({});
  // const [title, setTitle] = useState();
  // const [content, setContent] = useState();

  useEffect(() => {
    const fetchblogDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/${slug}`
        );
        setBlogData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchblogDate();
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/blogs/${slug}`,
        blogData
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  };

  return (
    <>
      <p>{slug}</p>
      <h1 className="text-4xl">update blog</h1>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col items-center w-1/2 gap-4 px-12 py-8 bg-gray-300"
      >
        <label htmlFor="title">
          Title
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={blogData.title}
            onChange={handleDataChange}
          />
        </label>
        <label htmlFor="Content">
          Content
          <textarea
            name="content"
            type="text"
            placeholder="content"
            value={blogData.content}
            onChange={handleDataChange}
          />
        </label>
        <button
          type="submit"
          className="px-8 py-2 text-gray-200 bg-gray-800 rounded-md"
        >
          Publish
        </button>
      </form>
    </>
  );
};
export default EditBlog;
