import React from "react";
import useBlogComment from "../../../hook/useBlogComments";
import { getComments } from "../../../api/CommentApi/CommentApi";

const Comments = ({ blogSlug }) => {
  // console.log(blogSlug);

  const { data } = useBlogComment(blogSlug);

  const topLevelComments = data?.topLevelComments || [];

  return (
    <div className="px-2 py-1 rounded-sm hover:bg-secondary/40 w-fit">
      {topLevelComments.length > 0 ? (
        <div className="text-sm">
          {topLevelComments === 1
            ? `1 comment`
            : `${topLevelComments.length} comments`}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-2 py-2 rounded-sm w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
          <span className="text-sm">Add Comments</span>
        </div>
      )}
    </div>
  );
};

export default Comments;
