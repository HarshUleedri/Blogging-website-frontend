import useReaction from "../../../hook/useReaction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Reaction = ({ blogSlug }) => {
  //hook
  const [reaction] = useReaction(blogSlug);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  //value
  const { clap, like, explodingHead } = reaction;
  const totalReaction = (clap ?? 0) + (like ?? 0) + (explodingHead ?? 0);

  //helper function

  const handleUnauthorizedClick = (event) => {
    if (!isAuthenticated) {
      event.stopPropagation();
      navigate(`/blog/${blogSlug}`, { state: { showLogin: true } });
    }
  };

  return (
    <div
      onClick={handleUnauthorizedClick}
      className="px-2 py-1 rounded-sm hover:bg-secondary/40 w-fit"
    >
      {totalReaction > 0 ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm ">
            {clap > 0 && (
              <span className="text-xs border border-white rounded-full shadow-sm bg-secondary/40">
                👏
              </span>
            )}
            {like > 0 && (
              <span className="text-xs border border-white rounded-full shadow-sm bg-secondary/40">
                💖
              </span>
            )}{" "}
            {explodingHead > 0 && (
              <span className="text-xs border border-white rounded-full shadow-sm bg-secondary/40">
                🤯
              </span>
            )}
          </div>
          <div className="text-sm">
            {totalReaction} {totalReaction === 1 ? "reaction" : "reactions"}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-sm w-fit">
          <span className="text-sm">Add Reaction</span>
        </div>
      )}
    </div>
  );
};

export default Reaction;
