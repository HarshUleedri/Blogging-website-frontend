import useBookmark from "../../../hook/useBookmark";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Bookmark = ({ blogId, blogSlug }) => {
  //hook
  const [isBookmark, toggleBookmark] = useBookmark();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //value
  const isthere = isBookmark.some((blog) => blog._id === blogId);

  const handleBookmarkToggle = (event) => {
    event.stopPropagation();
    if (!isAuthenticated) {
      navigate(`/blog/${blogSlug}`, { state: { showLogin: true } });
    }
    toggleBookmark(blogSlug);
  };

  return (
    <div onClick={handleBookmarkToggle}>
      {isthere ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="p-1.5 text-accent rounded-sm  hover:bg-accent/10"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="p-1.5 text-dark rounded-sm  hover:bg-accent/10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      )}
    </div>
  );
};

export default Bookmark;
