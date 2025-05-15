import { useAllBlogComments } from "../../../hook/useAllBlogsComments";
import { useNavigate } from "react-router-dom";

const DetailBlogCard = ({ blog }) => {
  const { title, createdAt, views, userReacted, _id, slug } = blog;

  //hook
  const { allComments } = useAllBlogComments();
  const navigate = useNavigate();

  const isoDate = createdAt;

  const formattedCreatedDate = new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  //value

  const blogCommentsCount = allComments?.filter(
    (comment) => comment.blogId === _id
  );

  return (
    <div className="flex items-center justify-between px-4 py-6 border rounded-sm">
      <div className="-space-y-1 break-words min-w-96 max-w-96 ">
        <h3
          onClick={() => navigate(`/blog/${slug}`)}
          className="mb-4 text-lg font-bold leading-5 text-accent"
        >
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-light">
            Published: {formattedCreatedDate}
          </p>
          {/* <p className="text-sm font-semibold text-light">Edited: {}</p> */}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <p className="text-sm text-light">
            {userReacted.length <= 25 ? "< 25" : "> 25"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
          <p className="text-sm text-light">
            {blogCommentsCount?.length.toString().padStart(2, "0")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p className="text-sm text-light">{views <= 25 ? "< 25" : "> 25"}</p>
        </div>
      </div>
      <div>
        <button className="px-1 rounded hover:bg-secondary text-light">
          Edit
        </button>
      </div>
    </div>
  );
};

export default DetailBlogCard;
