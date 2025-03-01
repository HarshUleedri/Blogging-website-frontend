import axios from "axios";
import { useState } from "react";

const CreateBlog = () => {
  const [title, settitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/blogs/", {
        title,
        content,
        author,
      });

      settitle("");
      setContent("");
      setAuthor("");
      alert("sucessfully created blog");  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>create your first blog</div>
      <form
        onSubmit={handleSubmite}
        className="flex flex-col items-center w-1/2 gap-4 px-12 py-8 bg-gray-300"
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
        </label>
        <label htmlFor="Content">
          {" "}
          Content
          <textarea
            type="text"
            placeholder="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </label>
        <label htmlFor="auther">
          Auther
          <input
            type="text"
            placeholder="content"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
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

export default CreateBlog;
