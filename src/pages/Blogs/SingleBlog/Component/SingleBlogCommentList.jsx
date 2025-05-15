import { useState } from "react";
import useBlogComment from "../../../../hook/useBlogComments";

import CommentCard from "./CommentCard";
// const renderNestedComments = (comments, blogSlug) => {
//   return comments.map((comment) => (
//     <div key={comment._id} className="pl-4 ml-8 border-l">
//       <CommentCard slug={blogSlug} comments={comment} />
//       {comment.replies?.length > 0 &&
//         renderNestedComments(comment.replies, blogSlug)}
//     </div>
//   ));
// };

const SingleBlogCommentList = ({ blogSlug }) => {
  //hook
  const { data } = useBlogComment(blogSlug);

  if (!data) return <div>Loading comments...</div>;

  const { topLevelComments } = data;

  return (
    <>
      <div className="flex flex-col w-full">
        {topLevelComments?.map((item, index) => (
          <>
            <div key={index} className="flex flex-col items-end">
              <div className="w-full">
                <CommentCard slug={blogSlug} comments={item} />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default SingleBlogCommentList;
